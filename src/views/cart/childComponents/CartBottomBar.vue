<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="checked-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span> 全选 </span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calculates">去计算:{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/CheckButton/CheckButtoin";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      // this.$store.getters.cartList()
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            console.log(item);
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      //  第一种：if (this.cartList.length === 0) return false;
      // return !(this.cartList.filter((item) => !item.checked).length);
      //  第二种：
      // if (this.cartList.length === 0) return false;
      // return !this.cartList.find((item) => !item.checked);
      //  第三种：
      if (this.cartList.length === 0) return false;
      let isCheked = false;
      for (let item of this.cartList) {
        if (!item.checked) {
          isCheked = false;
          return isCheked;
        }
      }
      return true;
    },
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll) {
      //   //全部选中
      //   this.cartList.forEach((item) => (item.checked = false));
      // } else {
      //   //全部不选中
      //   this.cartList.forEach((item) => (item.checked = true));
      // }

      return this.isSelectAll
        ? this.cartList.forEach((item) => (item.checked = false))
        : this.cartList.forEach((item) => (item.checked = true));
    },
    calculates() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
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
.price {
  margin-left: 40px;
  flex: 1;
}
.bottom-bar {
  position: fixed;
  display: flex;
  bottom: 50px;

  width: 100%;
  height: 40px;
  line-height: 40px;

  background-color: #eee;
  font-size: 14px;
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
  width: 60px;
}
.checked-button {
  line-height: 20px;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.calculate {
  width: 90px;
  /* margin-right: 5px; */
  background-color: #f50;
  color: #fff;
  text-align: center;
}
</style>
