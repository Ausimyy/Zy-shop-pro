import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import ElementUI from 'element-ui'
// 引入图标库
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 给axios配置拦截器，并绑定token
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  var token = window.sessionStorage.getItem('token')
  config.headers.Authorization = token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eElementUIslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
