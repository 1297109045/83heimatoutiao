import Vue from 'vue'
import App from './App.vue'
import router from './pemission'
import axios from './utils/axios.config'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Component from './components'
import './style/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
