import store from '@/store'

/**
 * 是否有某个页面权限
 * @description 传入需要判断的页面权限，进行判断返回true/false
 * @author changz
 * @param {String} [per] - 页面权限
 * @example
 * <a-button v-if="hasPagePer('asset_maintain')">添加</a-button>
 * */
export function hasPagePer(per) {
  let result = false
  const permList = store.state.empower.menu_perm // 当前用户拥有的操作权限
  if (permList.includes(per)) {
    result = true
  } else {
    result = false
  }
  return result
}

/**
 * 是否有某个操作权限
 * @description 传入当前操作需要的权限，进行判断返回true/false
 * @author changz
 * @param {String} [per] - 操作权限
 * @example
 * <a-button v-if="hasOperatePer('role_auth_per')">添加</a-button>
 * */
export function hasOperatePer(per) {
  let result = false
  const permList = store.state.empower.operate_perm // 当前用户拥有的操作权限
  if (permList.includes(per)) {
    result = true
  } else {
    result = false
  }
  return result
}