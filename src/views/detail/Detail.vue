<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";

import { getDetail, Goods } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
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
      this.topImages = data.itemInfo.topImages;

      //2.获取商品信息:实现了数据的整合
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goods);
    });
  },
  components: {
    // NavBar,
    DetailNavBar,
    DetailSwiper,
  },
  methods: {},
};
</script>

<style scoped>
</style>

