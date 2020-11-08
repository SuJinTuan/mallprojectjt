import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export default {

  // mutations: {
  // mutations唯一的目的就是修改state中的状态：
  // 同时mutaions中的每个方法尽可能完成的事件比较单一点
  // addCart(state,args)
  // },


  [ADD_COUNTER](state, payload) {
    payload.count++//目的是：跟踪购物车数量
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
}
