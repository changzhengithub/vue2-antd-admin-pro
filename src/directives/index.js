/**
 * @description 定义多个全局自定义指令
 * @author changz
 * @example 直接在main.js引入后就可以自动注册modules下的所有指令
 * */

import Vue from 'vue'

const files = require.context('./modules', false, /.+\.js$/)

// 按模块引入
// files.keys(): 打印出来为['./focus.js','/loadmore.js']
files.keys().forEach(fileName => {
  const directiveConfig = files(fileName) // 获取指令函数
  const directiveName = fileName // 获取指令名
    .replace(/^\.\//, '') // 去除开头的'./'
    .replace(/\.\w+$/, '') // 去除文件扩展名

  Vue.directive(directiveName, directiveConfig.default || directiveConfig)
})