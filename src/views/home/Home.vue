<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFiexed"
      ref="topTabControl"
    />

    <!--
      1. 如果不加冒号传过去的就是字符串,我们要确定类型;驼峰命名如果不加-变成小写，那么就会报错，因为HTML5和vue的底层原因。
      2.上拉加载的：
       -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swpierImageLoad="swpierImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />

      <!-- class="tab-control"
      在better-scroll里面这个办法行不通：:class="{ fixed: isTabFiexed }"
       -->
      <tab-control
        ref="tabControl"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- 监听组件根元素 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 导入的文件分类
//views-home-childComponent
import HomeSwiper from "./childComponent/HomeSwiper";
import RecommendView from "./childComponent/RecommendView";
import FeatureView from "./childComponent/FeatureView";

//components-content\
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

//network
import { getHomeMultidata, getHomeGoods } from "network/home";

// common
import { debounce } from "common/utils";
import { itemListenerMinxin } from "common/mixin";

export default {
  name: "Home",
  components: {
    // 注册的组件进行分类
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop,

    NavBar,
    TabControl,
    GoodsList,
  },
  mixins: [itemListenerMinxin],
  // 存储我们传过来的数据
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFiexed: false,
      saveY: 0,
      // showgoods: null,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    // 这个方法会被默认的执行
    console.log("home-d");
  },
  activated() {
    console.log("home-enter-位置-activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 最好强制刷新一次，不然就会出现意外问题
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();
    console.log("deactivated");

    // 2.取消全局变量的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  // 主键创建完之后立即进行网络请求
  created() {
    // console.log(this);VueRouter
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  //mounted：只是挂载,但是不包括里面的图片加载
  mounted() {
    // 要手动代码点击一次？？？
    this.tabClick(0);
    console.log(123);
    // 1.图片加载完成的事件监听
    // refresh产生了闭包
    // const refresh = debounce(this.$refs.scroll.refresh, 50);1
    // const refresh = function (...args) {
    //   if (timer) clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     func.apply(this, args);
    //   }, delay);
    // };
    // 3.监听item中图片加载完成
    // 我们在createed里面拿$refs, 非常有可能是拿不到;
    // 对我们监听的事件进行保存
    // this.itemImgListener = () => {2
    // refresh();3
    // };4
    // this.$bus.$on("itemImageLoad", this.itemImgListener);5
  },

  methods: {
    /**
     *事监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.showGoods;
      // 让两个TabControl的currentIndex保持一致
      // if (this.$refs.topTabControl !== undefined) {
      this.$refs.topTabControl.currentType = index;
      this.$refs.tabControl.currentType = index;
      // }
    },
    backClick() {
      // console.log(this.$refs.scroll.scroll);
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // position.y < 1000;
      this.isShowBackTop = -position.y > 1000 ? true : false;

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFiexed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },
    swpierImageLoad() {
      // 2.获取tabConstrol的offsetTop
      // 所有的组件都有一个属性：$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(
        (res) => {
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 完成了上拉加载更多上拉加载的
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* 视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 脱离标准流 在使用浏览器原生滚动是，为了让导航不跟随一起滚动*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/*
吸顶功能一
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* 吸顶二 */
/* .fixed {
  托镖了
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
} */
/* 吸附三 */
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;

  /* 脱离标准流 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .centent {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
