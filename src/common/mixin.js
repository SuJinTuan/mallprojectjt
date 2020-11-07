// common
import { debounce } from "common/utils";
export const itemListenerMinxin = {
  // components: {

  // },
  // methods: {

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
