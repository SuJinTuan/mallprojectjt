<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']">
    </tab-control>
    <goods-list :goods="goods['pop'].list"></goods-list>

    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
  </div>
</template>

<script>
// 导入的文件分类
//views-home-childComponent
import HomeSwiper from "./childComponent/HomeSwiper";
import RecommendView from "./childComponent/RecommendView";
import FeatureView from "./childComponent/FeatureView";

//components-content\
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

//network
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    // 注册的组件进行分类
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
  },
  // 存储我们传过来的数据
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  // 主键创建完之后立即进行网络请求
  created() {
    // console.log(this);VueRouter
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(
        (res) => {
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 脱离标准流 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
