// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import 'iview/dist/styles/iview.css' // 使用 CSS
import config from '../config'
import i18n from '@/locale'
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

Vue.config.productionTip = false
Vue.use(iView) // 必不可少的

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
