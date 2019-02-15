import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home ,redirect:'/welcome',children:[{
      path:'/welcome',component:Welcome
    }]}
  ]
})
// 路由导航守卫，只有登录用户才能访问home页面
router.beforeEach((to, from, next) => {
  console.log(this)
  if (to.path == '/login') {
    return next()
  }
  var token = window.sessionStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
