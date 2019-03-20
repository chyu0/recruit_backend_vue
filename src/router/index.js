import Vue from 'vue'
import Router from 'vue-router'
import login from './login-router'
import {error_router} from './other-router'
import iView from 'iview'
import store from '@/store'
import {getToken, canTurnTo, setTitle } from '@/libs/util'
import {getMenuList} from '@/api/menu/menu.js'
import { oneOf } from '@/libs/tools'
import config from '../../config'
const { homeName } = config

Vue.use(Router)

export const routes = [
  ...login,
  ...error_router
]

const router = new Router({
  mode: "history",
  routes
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

const whiteList = ["register"]
const reg = /\.(do|jpg|png|gif)$/  //匹配到do这种后缀，不走前端的拦截

//登录及权限验证
const authCheck = (to, from, next) => {
  let toPath = to.path;
  if(reg.test(toPath)){
    return ;
  }
  if(oneOf(to.name, whiteList)){
    turnTo(to, store.state.user.access, next)
    return;
  }
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME, // 跳转到登录页
      query: {
        returnUrl : window.location.href
      }
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    turnTo(to, store.state.user.access, next)
  }
}

//不需要加载菜单白名单
router.beforeEach((to, from, next) => {
  console.log("---->to",to)
  iView.LoadingBar.start()
  const token = getToken()
  var hasInit = store.state.menu.hasInit;
  if(token && !hasInit){
    getMenuList(function () {
      var menus = store.state.menu.menus
      if(menus && menus.length > 0){
        router.addRoutes(menus);
        for(let i=0 ;i<menus.length; i++){
          router.options.routes.push(menus[i])
        }
      }
      if(to.name){//页面刷新可能没有name
        authCheck(to,from,next)
      }else{
        router.push({
          path:to.path
        });
      }
    })
  }else{
    authCheck(to,from,next)
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
