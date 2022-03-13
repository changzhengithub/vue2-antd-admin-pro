import axios from 'axios'
// import store from '@/store'
import storage from 'store'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { Notification } from 'ant-design-vue'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: window.api,
  timeout: 1000 * 60 * 10, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)

    if (error.response.status === 404) {
      Notification.error({
        title: '不存在该页面',
        message: data.message
      })
      return false
    }

    if (error.response.status === 403) {
      Notification.error({
        title: '未经授权',
        content: data.message
      })
    }

    if (error.response.status === 401) {
      Notification.error({
        title: data.msg ? '提示' : '未经授权',
        content: data.msg ? data.msg : '授权验证失败'
      })
      if (token) {
        storage.remove(ACCESS_TOKEN)
        storage.remove(USER_INFO)
      }
      window.location.reload()
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

export default request
