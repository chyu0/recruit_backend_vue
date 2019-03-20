import Vue from 'vue'
import Vuex from 'vuex'

import app from './module/app'
import user from './module/user'
import menu from './module/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    app,
    menu
  }
})
