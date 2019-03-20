import {post, get} from '@/libs/request';
import {forEach, hasOneOf} from '@/libs/tools'
import Main from '@/components/main'
import parentView from '@/components/parent-view'
import store from '@/store'

export const getMenus = () => {
  return post("menu/list.do")
}

export const getMenuList = (callback) => {
  let menus = []
  getMenus().then(function (res) {
    if(res.code == 200){//请求成功
      var data = res.data;
      if(data){
        for(var key in data){
          var curMenu = initMenu(data[key]);
          menus.push(curMenu);
        }
        console.log("menus-------->",menus)
        store.dispatch('setMenus', menus)
        var menuList =  getMenuByRouter(menus, "super_admin");
        console.log("menuList-------->",menuList)
        store.dispatch('setMenuList', menuList)
        store.dispatch('setHasInit', true)
        callback()
      }
    }
  })
}

export const initMenu = (menu) =>  {
  var curMenu = getMenu(menu);
  var childList = menu.childMenus
  if(childList && childList.length > 0){
    for(var i=0; i<childList.length; i++){
      if(!childList[i].child){//没有下一级子菜单
        var childMenu = getChild(childList[i]);
        curMenu.children.push(childMenu);
      }else{
        curMenu.children.push(initMenu(childList[i]));
      }
    }
  }else{
    curMenu.children.push(getChild(menu));
  }
  return curMenu;
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const getChild = (menu) =>{
  return {
    path: menu.linkUrl,
    name: menu.menuName,
    meta: {
      icon: 'md-funnel',
      title: menu.menuName
    },
    component: resolve => require([`@/${menu.vue}.vue`], resolve)
  }
}

const getMenu = (menu) =>{
  var meta = {
    icon: 'md-menu',
    title: menu.menuName
  }
  var name = menu.menuName
  if(menu.parentId == 0){//一级菜单
    if(!menu.childMenus || menu.childMenus <= 0){
      menu.linkUrl = "/"//一级菜单，且下面没子菜单
      meta = meta || {
        hideInBread: true,
        hideInMenu: true
      }
      name = null
    }else{
      menu.linkUrl = "/" + menu.linkUrl
    }
  }
  return {
    path: menu.linkUrl,
    name: name,
    meta: meta,
    component: menu.parentId > 0 ? parentView : Main,
    children:[]
  }
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

//获取菜单树
export const getMenuTree = (callback) => {
  let menus = []
  getMenus().then(function (res) {
    if(res.code == 200){//请求成功
      var data = res.data;
      if(data){
        console.log("getMenuTree------------",data)
        for(var key in data){
          var curMenu = initMenuTree(data[key]);
          menus.push(curMenu);
        }
        callback(menus)
      }
    }
  })
}

export const initMenuTree = (menu) =>  {
  var curMenu = {title: menu.menuName, expand: true, children:[]};
  var childList = menu.childMenus
  if(childList && childList.length > 0){
    for(var i=0; i<childList.length; i++){
      if(!childList[i].child){//没有下一级子菜单
        var childMenu = {title: childList[i].menuName, expand: true};
        curMenu.children.push(childMenu);
      }else{
        curMenu.children.push(initMenuTree(childList[i]));
      }
    }
  }else{
    curMenu.children.push({title: menu.menuName, expand: true});
  }
  return curMenu;
}
