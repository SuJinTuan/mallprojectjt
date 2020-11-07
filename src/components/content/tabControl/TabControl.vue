<template>
  <div class="tab-control">
    <!-- 如果只是文字不一样我们可以选择不用插槽 -->
    <!-- 绑定事件；绑定类样式； -->
    <div
      v-for="(item, index) in titles"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
      :key="index"
    >
      <span>
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  // 外面往里面传
  props: {
    titles: {
      // 当默认值的对象或者数组时，要把它变成函数，在返回默认值
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 作为一个标签
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //子组件发送点击 （把事件传到外面去）使用自定义事件；内部发生事件往外部传
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
