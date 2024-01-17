/**
 * @desc 全局过滤器
 * 在此定义好后在mian.js中引入循环注册
 * */ 

import Vue from 'vue'

// 文件内容大小
Vue.filter('formatbytes', function (bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
})

// 数字格式化
Vue.filter('formatnumber', function (num) {
  const count = parseInt(num)
  let str = ''
  if (count >= 10000000) {
    str = (parseFloat(count / 100000000)).toFixed(1) + '亿'
  } else if (count > 1000) {
    str = (parseFloat(count / 10000)).toFixed(1) + '万'
  } else {
    str = count.toString()
  }
  return str
})