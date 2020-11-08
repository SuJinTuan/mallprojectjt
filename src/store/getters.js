
// import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"
export default {
  cartLength(state) {
    // console.log(state.cartList);
    return state.cartList.length
  },
  cartList(state, getters) {
    // console.log(state.cartList);

    return state.cartList
  }
}
