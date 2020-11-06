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
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    console.log("refresh-de-detail");

    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    console.log("防抖--detail");
  },
}
