<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
/* 水平布局 */
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12rpx;
  padding: 15px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 72px;
  height: 72px;
  margin-bottom: 10px;
}
</style>
