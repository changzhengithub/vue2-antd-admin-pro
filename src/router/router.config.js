import { RouteView, BasicLayout } from '@/layouts'

/**
 * @desc 权限路由表
 * 路由分为需要登录的不需要登录的
 * 不需要登录的放在基础路由里，如登录、注册、活动页，需要登录的放在权限路由里，
 * 白名单页面放在基础路由里，如活动页，通过meta字段isWhite区分登录注册页
 * 需要登录的又分为需要权限控制和不需要权限控制的，通过meta字段isAuth进行判断需不需要权限判断
 * 在导航栏显示的路由统一放在根路由下走基础布局
 * 不在导航栏显示的可以放在根路由外面走其他布局，比如个人中心
 * 或者在根路由走基础布局，通过hidden自动控制，比如详情页
 * keepAlive是否缓存该组件，缓存必须在每一层router-view加keep-alive才会生效
 * permission为权限id，全局必须保持唯一
 * */

const Empower = () => import(/* webpackChunkName: 'empower' */ '@/views/empower')
const Exception = () => import(/* webpackChunkName: 'exception' */ '@/views/exception')
const Promotion = () => import(/* webpackChunkName: 'promotion' */ '@/views/promotion')

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
    meta: { keepAlive: true, isAuth: false },
    children: [
      // 首页
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { title: '首页', icon: 'home', keepAlive: true, isAuth: false, permission: 'home' },
        hidden: false
      },
      {
        path: '/organize',
        name: 'Organize',
        component: RouteView,
        meta: { title: '组织管理', icon: 'bar-chart', keepAlive: true, isAuth: true, permission: 'org' },
        hidden: false,
        children: [
          {
            path: '/organize/unit',
            name: 'Unit',
            component: Unit,
            meta: { title: '递归组件', icon: 'api', keepAlive: true, isAuth: true, permission: 'unit' },
            hidden: false
          },
          // 单位详情
          {
            path: '/organize/unit/:id',
            name: 'UnitDetail',
            component: UnitDetail,
            meta: { title: '单位详情', icon: 'form', keepAlive: true, isAuth: true, permission: 'unit_detail' },
            hidden: true
          },
          // 团队管理
          {
            path: '/organize/team',
            name: 'Team',
            component: Team,
            meta: { title: '团队管理', icon: 'bug', keepAlive: true, isAuth: true, permission: 'team' },
            hidden: false
          }
        ]
      },
      // 文件上传
      {
        path: '/upload',
        name: 'Upload',
        component: Upload,
        meta: { title: '文件上传', icon: 'upload', keepAlive: true, isAuth: true, permission: 'upload' },
        hidden: false
      },
      // 设置
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: { title: '设置', icon: 'setting', keepAlive: true, isAuth: true, permission: 'setting' },
        hidden: false
      }
    ]
  },
  // 用户信息
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { keepAlive: false, isAuth: false, permission: 'user' }
  }
]

// 基础路由
export const constantRouterMap = [
  {
    path: '/promotion',
    name: 'Promotion',
    component: Promotion,
    meta: { title: '推广页', isWhite: true }
  },
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
