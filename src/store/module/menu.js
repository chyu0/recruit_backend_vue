import {
  getMenus, initMenu, getMenuByRouter
} from "@/api/menu/menu"

export default {
  state: {
    menus : [],
    menuList: [],
    hasInit:false
  },
  mutations: {
    setMenus (state, menus) {
      state.menus = menus
    },
    setMenuList(state, menuList){
      state.menuList = menuList
    },
    setHasInit(state, hasInit){
      state.hasInit = hasInit
    }
  },
  actions: {
    setHasInit({commit}, hasInit){
      commit('setHasInit', hasInit)
    },
    setMenuList({commit}, menuList){
      commit('setMenuList', menuList)
    },
    setMenus({commit}, menus){
      commit('setMenus', menus)
    }
  }
}
