<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
    </scroll>
    <!-- 详情页：{{ iid }} -->
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

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import GoodsList from "components/content/goods/GoodsList";
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
    Scroll,
    GoodsList,
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
    };
  },
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
      console.log(res);
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
      console.log(this.commentInfo);
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
    });
  },

  methods: {
    // 获取重新刷新scroll；为了获取图片加载完的高度
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
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
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>

