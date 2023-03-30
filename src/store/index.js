/**
 * @desc 状态管理器入口
 * @author changz
*/

import Vue from 'vue'
import Vuex from 'vuex'
import publicVuex from './modules/public'
import empower from './modules/empower'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    root: '111',
    userName: 'aaa'
  },
  mutations: {
    setRoot(state, root) {
      state.root = root
    },
    setName(state, name) {
      state.userName = name
    }
  },
  modules: {
    publicVuex,
    empower
  }
})
