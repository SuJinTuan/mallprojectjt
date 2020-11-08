import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
// 使用插件
Vue.use(Vuex);


const state = {
  // 存放一个变量添加一个商品:数组--》对象
  cartList: [],

}
// 2.创建插件Store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 3.挂载到Vue实例上
export default store
