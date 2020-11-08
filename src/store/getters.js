
// import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"
export default {
  cartLength(state) {
    // console.log(state.castList);
    return state.castList.length
  },
  cartList(state) {
    // console.log(state.cartList);

    return state.castList
  }
}
