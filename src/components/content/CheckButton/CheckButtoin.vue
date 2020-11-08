<template>
  <div class="check-button" :class="{ cheak: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheakButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  /* background-color: #f50; */
  border-radius: 50%;
  border: 2px solid #aaa;
}
.cheak {
  border-color: #f50;
  background-color: #f50;
}
</style>
