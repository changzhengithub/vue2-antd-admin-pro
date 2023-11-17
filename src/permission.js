
/**
 * 路由权限控制
 * 监听每次路由跳转，进行过滤和筛选路由
 */

import storage from 'store'
import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { constantRouterMap } from '@/router/router.config'

import { ACCESS_TOKEN } from '@/store/mutation-types'

import notification from 'ant-design-vue/es/notification'


NProgress.configure({ showSpinner: false }) // NProgress Configuration


const whiteList = constantRouterMap.filter(item => item.meta && item.meta.isWhite).map(el => el.name) // 白名单
const empowerList = ['Empower'] // 白名单，不需要权限控制的路由
const loginRoutePath = '/empower' // 登录地址

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 设置系统标题
  if (to.meta && to.meta.title) {
    const domTitle = '系统标题'
    document.title = to.meta.title + '-' + domTitle
  }

  if (whiteList.includes(to.name)) {
    next()
  } else {
    // 判断是否有token
    if (storage.get(ACCESS_TOKEN)) {
      if (empowerList.includes(to.name)) {
        next({ path: '/' })
        NProgress.done()
      } else {
        // 判断是否有页面权限
        if (!store.state.empower.permission.length) {
          // 没有调用登录接口，获取用户权限
          store
            .dispatch('GetInfo')
            .then((permissionList) => {
              // 根据用户权限过滤路由
              store.dispatch('FilterRoutes', { permissionList }).then(() => {
                const { routerList } = store.state.empower
                // 动态添加可访问路由表
                routerList.forEach(item => {
                  router.addRoute(item)
                })
                // 必要，要不然会死循环
                next({ ...to, replace: true })
              })
            })
            .catch(() => {
              notification.error({
                message: '错误',
                description: '请求用户信息失败，请重试'
              })
              // 失败时，清空历史保留信息
              storage.clearAll()
              window.location.reload()
            })
        } else {
          next()
        }
      }
    } else {
      if (empowerList.includes(to.name)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } })
        NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
