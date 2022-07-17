/**
 * @titile 递归理器
 * @description 一些包含递归思想的方法
 * 对象深拷贝、嵌套数组查询
 * */

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

/**
 * @description 根据id查询某个值
 * @param {Array} [list] - 嵌套JSON数组
 * @author changz
 * */
export function deepQueryById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i]
    } else if (list[i].children && list[i].children.length) {
      const result = deepQueryById(list[i].children, id)
      if (result) return result
    }
  }
}

/**
 * @description 根据id查询父id
 * @param {Array} [list] - 嵌套JSON数组
 * @author changz
 * */
export function deepQueryParentKeyById(list, id) {
  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    if (node.children && node.children.length) {
      if (node.children.some(item => item.id === id)) {
        return node.id
      } else {
        const parentId = deepQueryParentKeyById(node.children, id)
        if (parentId) return parentId
      }
    }
  }
}

/**
 * @description 根据id查询所有父节点，包含自己
 * @param {Array} [list] - 嵌套JSON数组
 * @example deepQueryPathById(arr, id)
 * @author changz
 * */
export function deepQueryPathById(list, id, path = []) {
  for (let i = 0; i < list.length; i++) {
    const tempPath = path.concat([])
    const node = list[i]
    tempPath.push(node) // 这里可以映射自己需要的节点
    if (node.id === id) return tempPath
    if (node.children && node.children.length) {
      const result = deepQueryPathById(node.children, id, tempPath)
      if (result) return result
    }
  }
}

/**
 * @description 根据id查询相连元素，包含自己
 * @param {Array} [list] - 嵌套JSON数组
 * @example deepQuerySamePathById(arr, id)
 * @author changz
 * */
 export function deepQuerySamePathById(list, id) {
  if (list.some(item => item.id === id)) {
    return list
  } else {
    for (let i = 0; i < list.length; i++) {
      const node = list[i]
      if (node.children && node.children.length) {
        const path = deepQuerySamePathById(node.children, id)
        if (path) return path
      }
    }
  }
}

/**
 * @description 根据id查询所子节点
 * @param {Array} [list] - 嵌套JSON数组
 * @example deepQueryChildPathById(arr, id)
 * @author changz
 * */
 export function deepQueryChildPathById(list, id, path = []) {
  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    if (node.id === id) {
      path.push(node) // 是否包含自己
      if (node.children && node.children.length) {
        path.concat(node.children)
        for (let j = 0; j < node.children.length; j++) {
          const childNode = node.children[j]
          deepQueryChildPathById(node.children, childNode.id, path)
        }
      }
    }
  }
  return path
}

export function formatData(list) {
  list.forEach(item => {
    item.isSelect = false
    if (item.children && item.children.length) {
      formatData(item.children)
    }
  })
}