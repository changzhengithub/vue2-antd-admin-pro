/**
 * 页面权限指令
 * @description 传入当前需要查看页面的权限，进行判断是否显示
 * @author changz
 * @param {String} - 页面权限
 * @example
 * <a-button v-page="'role_auth_per'">添加</a-button>
 * */

// 或者在util中定义一个公共函数，传入权限通过v-if判断是否显示当前操作

import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const permission = binding.value // 获取权限值
    const permList = store.state.user.pagePerm // 当前用户拥有的操作权限
    if (!permList.includes(permission)) {
      el.parentElement.removeChild(el) // 不拥有该权限移除dom元素
    }
  }
}