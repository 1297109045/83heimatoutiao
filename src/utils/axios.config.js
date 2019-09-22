import axios from 'axios'
import router from '../pemission'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截
axios.interceptors.request.use(function (config) {
  // console.log(111)
  // console.log(error.response)
  let token = window.localStorage.grtItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截 响应数据回来到达then方法之前
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理.执行成功时进入
  console.log(1111)
  return response.data ? response.data : {}
}, function (error) {
  // 执行失败时执行
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误 '
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message, type: 'warning' })
  //   希望 在异常处理函数中将所有的错误都处理完毕 不再进入catch  终止错误
  return new Promise(function () {}) // 终止当前的错误
})
// export default axios
export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
