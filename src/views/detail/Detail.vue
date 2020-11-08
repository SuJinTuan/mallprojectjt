<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @tabClick="tabClick" ref="nav" />
    <!-- 因为probetype默认是一个：0 如果不传一个值过去，则监听不到probetype -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- 属性：topImages 传入值:top-images -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="paramsed" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommended" />
    </scroll>
    <!-- 我们在获取发送过来的数据的时候：
      v-on~~>@addToCart="addToCart";用的是驼峰命名
      但是如果是监听绑定元素：v-bind~~>：则属性的驼峰命名要变-来代替
     -->
    <detail-bottom @addToCart="addToCart" />
    <!-- 监听组件根元素 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottom from "./childComponents/DetailBottom";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { itemListenerMinxin, backTopMixin } from "common/mixin";
import { debounce } from "common/utils";
// import { ADD_CART } from "../../store/mutations-types";

// import { BACKTOP_DISTANCE } from "common/const";
export default {
  name: "Detail",
  components: {
    // NavBar,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottom,
    Scroll,
    GoodsList,
    // BackTop,
  },

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  mixins: [itemListenerMinxin, backTopMixin],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    // 我们可以进行一次封装--network--detail.js
    getDetail(this.iid).then((res) => {
      //  1.获取顶部的图片轮播数据
      // 因为我们在一开始的App.vue文件，为了keep-alive
      // 包了<router-view />一层;所以我们那些生命周期的代码都不会在执行了
      // 所以我们的created里面的代码保存的数据都是以前的数据;
      // 我们这里由于每点击一次进去的都是新的详情,所以都是新的数据,我们可以用exclude
      // console.log(res);
      const data = res.data.result;

      // 1.取出轮播图的数据
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息:实现了数据的整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情星系
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6：取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 这里的只是DOM和图片都没有加载完：this.$refs.paramsed.$el压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(-this.$refs.paramsed.$el.offsetTop);
      // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(-this.$refs.recommended.$el.offsetTop);
      // console.log(this.themeTopYs);

      this.$nextTick(() => {
        // 这里是dom选择完了，是最新的数据
        // 但是，图片还是没有完全加载渲染完
        //渲染线程都不是同一个线程；同时它是个异步执行的回调
        // this.themeTopYs = [];
        // // 如果offsetTop值不对的时候，都是因为图片的问题
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(-this.$refs.paramsed.$el.offsetTop);
        // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(-this.$refs.recommended.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.data.list;
    });

    // 4.给getThemeTopY赋值(对this.getThemeTopY赋值操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramsed.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommended.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  updated() {
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(-this.$refs.paramsed.$el.offsetTop);
    // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(-this.$refs.recommended.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  mounted() {
    // $el是我们组件里的跟组件；由于我们在封装组件的时候
    // 使用了判断： v-if="Object.keys(detailInfo).length !== 0"
    // 所以当使用根组件去渲染的时候里面没有有任何数据
  },
  // destroyed
  deactivated() {
    //1.取消全局变量的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
    // console.log("$off-destroyed");

    // 2
  },
  methods: {
    // 获取重新刷新scroll；为了获取图片加载完的高度
    imageLoad() {
      // 函数内部有自己的作用域，会每次调用的时候都会生成一个新的
      // 所以如果 跟之前的没有关系的话，那么和之前的就不会有一个防抖效果
      // 所以需要把let refresh = debounce(this.$refs.scroll.refresh, 50);保存起来
      this.refresh();
      // return this.$refs.scroll.refresh();
      // console.log("++");

      // // 当我们的图片和dom加载完了才能获取offsetTop值；
      // // 所以只有重新渲染之后拿那就正确了
      // this.themeTopYs = [];
      // // 如果offsetTop值不对的时候，都是因为图片的问题
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(-this.$refs.paramsed.$el.offsetTop);
      // this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(-this.$refs.recommended.$el.offsetTop);
      // console.log(this.themeTopYs);
      this.getThemeTopY();
    },
    tabClick(index) {
      // 我们通过动态获取offsetTop的值

      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    contentScroll(position) {
      const positionY = -position.y;

      // 2.positionY和主题进行对比
      // 【0, -9305, -10054, -10251】
      // positionY 在  0和   9305之间,index=0,
      // positionY 在  9305和    10054之间,index=1,
      // positionY 在  10054和   10251之间,index=2,大于或者等于10251 idnex=3;
      // positionY 在  10251和   ++之间,index=3,

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // positionY > this.themeTopYs[i] &&
        // positionY < this.themeTopYs[i + 1]这样写是有问题的！！！
        // 第一种方法：
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // )
        // 第二种方法：
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // console.log(i);
      }
      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 1000 ? true : false;
      this.isTabFiexed = -position.y > this.tabOffsetTop;
    },
    // 3.是否显示回到顶部
    //  this.isShowBackTop = -position.y > BACK_POSITION;
    // backClick() {
    //   // console.log(this.$refs.scroll.scroll);
    //   this.$refs.scroll.scrollTo(0, 0, 1000);
    // },
    // contentScroll(position) {
    // 1.判断BackTop是否显示
    // position.y < 1000;
    // this.isShowBackTop = -position.y > 1000 ? true : false;

    // 2.决定tabControl是否吸顶(position:fixed)
    // this.isTabFiexed = -position.y > this.tabOffsetTop;
    // },
    addToCart() {
      console.log("atc");
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 2.将我们的商品添加都购物车
      // 修改任何的store里面的东西，都要经过我们的mutaion
      // 进行提交
      // this.$store.commit("addCart", product);
      // 进行分发
      this.$store.dispatch("ADD_CART", product);
    },
  },
  computed: {},
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>

