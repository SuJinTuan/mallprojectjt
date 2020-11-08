import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"

// 使用插件
Vue.use(Vuex);


const state = {
  // 存放一个变量添加一个商品:数组--》对象
  castList: [],

}
// 2.创建插件Store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
})

// 3.挂载到Vue实例上
export default store
