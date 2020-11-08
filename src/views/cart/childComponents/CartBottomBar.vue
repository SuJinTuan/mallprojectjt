<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="checked-button" />
      <span> 全选 </span>
    </div>

    <div>合计：{{ totalPrice }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton/CheckButtoin";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      // this.$store.getters.cartList()
      return (
        "￥" +
        this.$store.state.castList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            console.log(item);
            return item.price * item.count;
          }, 0)
      );
    },
  },
};
</script>

<style scoped>
/* .bottom-bar {
  height: 40px;
  background-color: #f50;
  position: relative;

  bottom: 60px;
} */

.bottom-bar {
  position: fixed;
  display: flex;
  bottom: 50px;

  width: 100%;
  height: 40px;
  line-height: 40px;

  background-color: #eee;
  /* left: 0; */
  /* box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2); */
  /* font-size: 14px; */
  /* color: #888; */
  /*

  line-height会被继承到下一位
  line-height: 44px;

  */
  /* padding-left: 35px; */
  /* box-sizing: border-box; */
}
.check-content {
  display: flex;
  /* justify-content: center; */
  /* 实现水平居中 */
  align-items: center;
  margin-left: 10px;
}
.checked-button {
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
