import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

import './mock'

// 引入 Antd UI
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 图片查看
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

// 权限设置
import '@/permission'

// 自定义指令
import '@/directives'

// 中央事件Bus
import EventBus from '@/utils/event-bus'
Vue.prototype.$bus = EventBus

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(VueViewer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
