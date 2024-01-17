/**
 * 权限配置JSON表
 * @description 用来给每个用户分配权限，对应页面路由权限和操作权限
 * permList 路由权限。
 * operateList 为页面中的操作权限，通过判断让元素是否显示
 * 可以通过 v-page/v-permission指令或者$pagePer/$operatePer在js中判断
 * */


const permissionList = [
  {
    title: '主页',
    permList: [
      { title: '主页', perm: 'home' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '组织管理',
    permList: [
      { title: '组织管理', perm: 'org_manage' },
      { title: '角色组织', perm: 'organize' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '角色管理',
    permList: [
      { title: '角色管理', perm: 'role_manage' },
      { title: '角色组织', perm: 'organize' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: [
      {
        title: '工单管理',
        perm: 'flow_gdgl_per',
        isCheck: false,
        isShow: true
      }
    ]
  },
  {
    title: '示例',
    permList: [
      { title: '示例', perm: 'example' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '个人中心',
    permList: [
      { title: '个人中心', perm: 'user' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '系统设置',
    permList: [
      { title: '系统设置', perm: 'setting' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  },
  {
    title: '消息中心',
    permList: [
      { title: '消息中心', perm: 'message_center' }
    ],
    isCheck: false,
    indeterminate: false,
    isDisable: false,
    operateList: []
  }
]
export default permissionList