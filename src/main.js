import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from "./store"

import toast from 'components/common/toast'

import FastCilck from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// 解决移动端300秒的延迟
FastCilck.attach(document.body)

Vue.config.productionTip = false;
// 创建事件总线对象
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast)

// 使用懒加载的图片
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/rocket_top.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// this组件中包含了：$router\$store
