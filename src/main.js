import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Component from './components'
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
