// request.js
import $ajax from 'axios'
import {Spin} from 'iview'
import router from '@/router'

// 创建axios实例
const service = $ajax.create({
  baseURL: process.env.API_ROOT, // api的base_url
  timeout: 150000,                  // 请求超时时间
  withCredentials : true, //支持跨域发送cookies
  crossDomain : true
});



//请求之前
service.interceptors.request.use((config)=>{
  Spin.show();
  return config;
});

// respone拦截器
service.interceptors.response.use(
  response => {
    Spin.hide()
    let res = response.data
    if (response.status != 200 && response.status != 301) {
      return Promise.reject("error")
    } else {
      if(res.code == 4001){//未登录，跳转至登录页
        return Promise.reject("notLogin")
      }
    }
    return Promise.resolve(response)
  },
  error => {
    Spin.hide()
    return Promise.reject(error)
  }
)

// 输出方法
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    var params = new URLSearchParams();
    if(data){
      for(var key in data){
        params.append(key, data[key])
      }
    }
    service.post(url, params)
      .then(res => {
        resolve(res.data)
      }, err => {
        if(err == "notLogin"){
          router.push({path:'/login',query:{returnUrl : window.location.href}})
        }
        reject(err)
        console.log(err)
      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}

export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {params : data})
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}

export default service
