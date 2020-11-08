<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <!-- <div slot="center">购物车({{ cartLength }})</div> -->
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />
    <!-- 底部汇总 -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComponents/CartList";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
  },
  computed: {
    // cartLength() {
    //   console.log(this.$store.getters.cartLength);
    //   return this.$store.getters.cartLength;
    // },

    // 两种语法：
    // ...mapGetters(["cartLength"]),
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
