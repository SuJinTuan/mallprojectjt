<template>
  <div id="home">
    <!-- <h3>2</h3> -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
  },
  // 存储我们传过来的数据
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  // 主键创建完之后立即进行网络请求
  created() {
    // console.log(this);VueRouter
    // 1.请求多个数据
    getHomeMultidata().then(
      (res) => {
        console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
