// common
import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMinxin = {
  // components: {

  // },

  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    // console.log("minxin-refresh-de-detail");

    this.itemImgListener = () => {
      this.refresh();

    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("mixin-防抖--detail");
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
  },
}
