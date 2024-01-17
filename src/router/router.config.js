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
const OrgManage = () => import(/* webpackChunkName: 'org-manage' */ '@/views/org-manage')
const RoleManage = () => import(/* webpackChunkName: 'role-manage' */ '@/views/role-manage')
const User = () => import(/* webpackChunkName: 'user' */ '@/views/user')
const Example = () => import(/* webpackChunkName: 'example' */ '@/views/example')
const Setting = () => import(/* webpackChunkName: 'setting' */ '@/views/setting')
const MessageCenter = () => import(/* webpackChunkName: 'message-center' */ '@/views/message-center')

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    meta: { keepAlive: true, isAuth: false },
    children: [
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
        meta: { title: '角色组织', icon: 'user', keepAlive: true, isAuth: true, permission: 'organize' },
        hidden: false,
        children: [
          {
            path: '/organize/org-manage',
            name: 'OrgManage',
            component: OrgManage,
            meta: { title: '组织管理', icon: 'apartment', keepAlive: true, isAuth: true, permission: 'org_manage' },
            hidden: false
          },
          {
            path: '/organize/role-manage',
            name: 'RoleManage',
            component: RoleManage,
            meta: { title: '角色管理', icon: 'team', keepAlive: true, isAuth: true, permission: 'role_manage' },
            hidden: false
          }
        ]
      },
      {
        path: '/example',
        name: 'Example',
        component: Example,
        meta: { title: '示例', icon: 'line-chart', keepAlive: true, isAuth: true, permission: 'example' },
        hidden: false
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting,
        meta: { title: '系统设置', icon: 'setting', keepAlive: true, isAuth: true, permission: 'setting' },
        hidden: false
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: { title: '个人中心', keepAlive: false, isAuth: false, permission: 'user' }
  },
  {
    path: '/user',
    name: 'MessageCenter',
    component: MessageCenter,
    meta: { title: '消息中心', keepAlive: false, isAuth: false, permission: 'message_center' }
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
