/**
 * @desc 状态管理器 - 公共数据
 * @author changz
*/

const publicVuex = {
  namespaced: true,

  state: {
    userId: '',
    userName: 'bbb'
  },

  mutations: {
    setUserId (state, userId) {
      console.log(state)
      state.userId = userId
    },
    setName(state, name) {
      state.userName = name
    }
  },
  getters: {},
  actions: {}
}

export default publicVuex