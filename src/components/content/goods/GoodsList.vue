<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
    <!-- {{ goods }} -->
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  /* 一行设置均分 2 列 */
  justify-content: space-around;
}
</style>
