<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showIamge" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    //因为是驼峰式命名所以我们在使用绑定对象时：goods-item
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showIamge() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      console.log("跳转到详情页");
      this.$router.push("/detail/" + this.goodsItem.iid);
      // this.$router.push({
      //   path: "/detail",
      //   query: {},
      // });
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1рх;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14pх 14рx;
}
</style>
