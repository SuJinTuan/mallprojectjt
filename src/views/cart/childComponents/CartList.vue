<template>
  <div class="cart-list">
    <!--
       @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
     -->
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
// mapGetters("vuex", {});

export default {
  name: "cartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  height: (100% - 59px -44px);
  overflow: hidden;

  /* 脱离标准流 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
