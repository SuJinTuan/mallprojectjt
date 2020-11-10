<template>
  <div id="category">
    <top-bar class="categoryTop"><div slot="center">分类</div></top-bar>
    <div class="content">
      <tab-menu
        class="mume"
        :categories="categories"
        @selectItem="selectItem"
        @rightScroll="rightScroll"
      />
      <scroll id="tab-content" :data="[categoryData]" ref="scroll">
        <tab-content-category :subcategories="showSubcategory" />
      </scroll>
    </div>
  </div>
</template>

<script>
import TopBar from "components/common/navbar/NavBar";
import TabMenu from "./childComps/TabMenu";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import { getCategory, getSubcategory } from "network/category";

export default {
  components: {
    TopBar,
    TabMenu,
    Scroll,
    TabContentCategory,
  },
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        console.log(res);
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
          };
        }
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      console.log(index);
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      console.log(index);
      this._getSubcategories(index);
    },
    rightScroll() {
      this.$refs.scroll.refresh();
    },
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.categoryTop {
  background-color: var(--color-tint);
  color: #fff;

  box-shadow: 0 2px 1px rgba(100, 100, 100, 0.05);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  /* bottom: 44px; */
}
.mune {
  width: 20px;
  height: 20px;
}
.content {
  height: 100vh;

  display: flex;
  position: relative;
  top: 49px;
}
#tab-content {
  height: calc(100% - 44px - 49px);
  flex: 1;
}
</style>
