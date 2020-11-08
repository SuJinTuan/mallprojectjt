export default {
  cartLength(state) {
    console.log(state.castList);
    return state.castList.length
  },
  cartList(state) {
    console.log(state.cartList);
    return state.castList
  }
}
