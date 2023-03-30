/**
 * @description 公共函数
 * @author changz
 * @import import {} from '@/utils/util'
 * */

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
* 截取字符串，根据 maxLength 截取后返回
* @param {*} str
* @param {*} maxLength
*/
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}


/**
 * @description 深拷贝
 * @param {Any} [target] - 拷贝数据
 * @author changz
 * */
export function deepClone(target) {
  // 引用类型
  if (typeof target === 'object' && target !== null) {
    let targeClone = Array.isArray(target) ? [] : {}
    for (const key in target) {
      targeClone[key] = deepClone(target[key])
    }
    return targeClone
  } else {
    return target
  }
}