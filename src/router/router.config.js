import { RouteView, BasicLayout } from '@/layouts'

/**
 * @desc 权限路由
 * @desc 走导航的路由都在根路由/里，走BasicLayout基础布局
 * @desc 不走导航的和根路由/放在同级或者放在根路由里加上hidden:true
 * @desc 不需登录的放在基础路由constantRouterMap里，并放在权限控制的白名单里才不会走权限验证
 * @desc keepAlive是否缓存该组件，缓存必须在每一层router-view加keep-alive才会生效
 * */

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception')

const Home = () => import(/* webpackChunkName: 'home' */ '@/views/home')
const Unit = () => import(/* webpackChunkName: 'unit' */ '@/views/unit')
const UnitDetail = () => import(/* webpackChunkName: 'unit-detail' */ '@/views/unit-detail')
const Team = () => import(/* webpackChunkName: 'team' */ '@/views/team')
const User = () => import(/* webpackChunkName: 'user' */ '@/views/user')
const Upload = () => import(/* webpackChunkName: 'upload' */ '@/views/upload')
const Setting = () => import(/* webpackChunkName: 'setting' */ '@/views/setting')

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    redirect: '/home',
    children: [
      // 首页
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'home', keepAlive: false, permission: 'home' },
        hidden: false
      },
      {
        path: '/organize',
        name: 'Organize',
        component: RouteView,
        meta: { title: '组织管理', icon: 'bar-chart', keepAlive: false, permission: 'org' },
        hidden: false,
        children: [
          {
            path: '/organize/unit',
            name: 'Unit',
            component: Unit,
            meta: { title: '递归组件', icon: 'api', keepAlive: false, permission: 'unit' },
            hidden: false
          },
          // 单位详情
          {
            path: '/organize/unit/:id',
            name: 'UnitDetail',
            component: UnitDetail,
            meta: { title: '单位详情', icon: 'form', keepAlive: false, permission: 'unit_detail' },
            hidden: true
          },
          // 团队管理
          {
            path: '/organize/team',
            name: 'Team',
            component: Team,
            meta: { title: '团队管理', icon: 'bug', keepAlive: false, permission: 'team' },
            hidden: false
          }
        ]
      },
      // 文件上传
      {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta: { title: '文件上传', icon: 'upload', keepAlive: false, permission: 'upload' },
        hidden: false
      },
      // 设置
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: { title: '设置', icon: 'setting', keepAlive: false, permission: 'setting' },
        hidden: false
      }
    ]
  },
  // 用户信息
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { keepAlive: false, permission: 'user' }
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/empower',
    name: 'Empower',
    component: Empower
  },
  // 异常处理
  {
    path: '/exception',
    name: 'Exception',
    component: Exception
  }
]
