import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

import './mock'

// 引入 Antd UI
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 权限设置
import '@/permission'

// 自定义指令
import directives from '@/utils/directives'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(directives)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
