import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import EventBus from '@/utils/event-bus'
import { hasOperatePer, hasPagePer } from '@/utils/permissions'

import '@/assets/css/reset.css'


// 引入 Antd UI
import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// 自定义主题
import '@/assets/less/theme.less'

// mock数据
import './mock'
// 权限设置
import '@/permission'
// 自定义指令
import '@/directives'

// 全局过滤器
import * as filters from '@/utils/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 插入过滤器名和对应方法
})

Vue.prototype.$operatePer = hasOperatePer
Vue.prototype.$pagePer = hasPagePer
Vue.prototype.$bus = EventBus

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
