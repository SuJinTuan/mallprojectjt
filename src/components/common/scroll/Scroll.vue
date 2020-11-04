<template>
  <!--
      ref只能绑定给子组件（明确获取某一个子组件）
    children：获取所有子组件（数组）
   -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建bScroll对象
    // 注意：我们不要使用query selector的方式获取选择器：因为它是获取的是第一个（不够准确）
    // 我们为了更准确的获取元素：可以绑定一个ref
    // console.log(this.$refs);
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,

      probeType: this.probeType,
      // // 实现上拉加载
      pullUpLoad: this.pullUpLoad,
    });
    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      //  我们要想办法把它传出去;对外自定义的一个事件
      this.$emit("scroll", position);
    });
    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
  },
  // components: {
  //   BScroll,
  // },
};
</script>

<style scoped>
</style>
