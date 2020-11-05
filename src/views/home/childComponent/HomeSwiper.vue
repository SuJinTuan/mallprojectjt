<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <!-- 在我们前端开发
          如果你要做一些动态布局；图片会经常影响你获取高offsetTop的值，类似这些值
         -->
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },

  methods: {
    imageLoad() {
      // console.log("imageload--");
      if (!this.isLoad) {
        this.$emit("swpierImageLoad");
        this.isLoad = true;
        // console.log("已经加载完成");
      }
    },
  },
};
</script>

<style scoped>
</style>
