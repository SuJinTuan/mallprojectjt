<template>
  <scroll class="wrapper">
    <div class="connents">
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <!-- <a :href="item.link"> -->
          <img class="item-img" v-lazy="item.image" alt="" />
          <div class="item-text">{{ item.title }}</div>
        <!-- </a> -->
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
export default {
  components: {
    Scroll,
  },
  props: {
    subcategories: {
      type: Object,

      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
/* .wrapper {
  height: 100vh;
  overflow: hidden;
  脱离标准流
  position: absolute;
  top: 0;
  bottom: 49px;
  left: 0;
  right: 0;
} */
.item {
  text-align: center;
  padding: 16px 0px 8px 0px;
  margin: 0 20px 0 20px;
  border-bottom: solid 2px var(--color-tint);
}

.item-img {
  width: 60%;
}

.item-text {
  color: var(--color-high-text);
  font-size: 16px;
  margin-top: 10px;
  font-weight: 700;
}
</style>
