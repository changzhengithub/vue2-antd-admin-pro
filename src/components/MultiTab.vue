<template>
  <div class="tab">
    <a-tabs v-model="activeKey" hideAdd type="editable-card" :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '20px', paddingTop: '1px' }" @edit="removeTab" @change="switchTab">
      <a-tab-pane v-for="page in pageList" :key="page.path" :tab="page.meta.title" :closable="pageList.length > 1"></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
/**
 * 简易多标签页
 * @desc 头部多标签页展示
 * @author changz
 * @example 调用示例
 * <MultiTab></MultiTab>
 */
import { mapMutations } from 'vuex'
export default {
  name: 'MultiTab',
  data() {
    return {
      fullPathList: [],
      activeKey: '',
      pageList: []
    }
  },
  watch: {
    '$route'() {
      this.getRoute()
    }
  },
  created() {
    this.getRoute()
  },
  methods: {
    ...mapMutations(['setCacheList']),
    getRoute() {
      const route = this.$route
      this.activeKey = route.path
      const pathList = this.pageList.map(item => item.path)
      if (!pathList.includes(route.path)) {
        this.pageList.push(route)
        this.setTabsCache()
      }
    },
    switchTab(activeKey) {
      this.$router.push({ path: activeKey })
    },
    removeTab(targetKey) {
      const index = this.pageList.findIndex(item => item.path === targetKey)
      if (index !== -1) {
        this.pageList.splice(index, 1)
        // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
        if (this.activeKey === targetKey) {
          this.activeKey = this.pageList[this.pageList.length - 1].path
          this.switchTab(this.activeKey)
        }
        this.setTabsCache()
      }
    },
    // 设置缓存
    setTabsCache () {
      const cacheList = this.pageList.filter(item => item.meta.keepAlive).map(item => item.name)
      this.setCacheList(cacheList)
    }
  }
}
</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
}
</style>
