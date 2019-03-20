import {
  login, register, logout
} from "@/api/user/login"

export default {
  state: {
    userId: "",
    access: '',
    token: ""
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token){
      state.token = token
    }
  },
  actions: {
    // 登录
    handleLogin({commit}, {userName, password, authCode}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password,
          authCode
        }).then(res => {
          console.log("login status:",res)
          if(res.code == 200){
            console.log(res)
            commit('setAccess', "super_admin")
            commit('setToken', res.data.token)
            resolve()
          }else{
            reject(res)
          }
        }, err => {
          reject(err)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleRegister({commit}, {userName, password, resetPassword, authCode}){
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        register({
          userName,
          password,
          resetPassword,
          authCode
        }).then(res => {
          if(res.code == 200){
            console.log(res)
            commit('setAccess', "super_admin")
            commit('setToken', res.data.token)
            resolve()
          }else{
            reject(res)
          }
        }, err => {
          reject(err)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogout({commit}){
      return new Promise((resolve ,reject) => {
        logout().then(res => {
          if(res.code == 200){
            commit('setAccess', null)
            commit('setToken',null)
            resolve();
          }else{
            reject(res)
          }
        }, err => {
          reject(err)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
