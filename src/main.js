import Vue from 'vue'
import App from './App.vue'
import router from './router/'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

// this组件中包含了：$router\$store
