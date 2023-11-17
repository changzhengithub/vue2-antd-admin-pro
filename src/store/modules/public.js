/**
 * @desc 状态管理器 - 公共数据
 * @author changz
*/

const publicVuex = {
  state: {
    userId: '',
    cacheList: [] // 缓存列表
  },

  mutations: {
    setUserId (state, userId) {
      state.userId = userId
    },
    setCacheList (state, cacheList) {
      state.cacheList = cacheList
    }
  },
  getters: {},
  actions: {}
}

export default publicVuex