<template>
  <div class="tab">
    <a-tabs v-model="activeKey" hideAdd type="editable-card" :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '20px', paddingTop: '1px' }" @edit="onEdit">
      <a-tab-pane v-for="page in pages" :key="page.fullPath" :tab="page.meta.title" :closable="pages.length > 1"></a-tab-pane>
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
      pages: [],
      activeKey: ''
    }
  },
  watch: {
    '$route'(newVal) {
      this.activeKey = newVal.fullPath
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        this.fullPathList.push(newVal.fullPath)
        this.pages.push(newVal)
      }
      this.setTabsCache()
    },
    activeKey(newPathKey) {
      this.$router.push({ path: newPathKey })
    }
  },
  created() {
    this.getRoute()
  },
  methods: {
    ...mapMutations(['setCacheList']),
    getRoute() {
      const route = this.$route
      this.activeKey = route.fullPath
      if (this.fullPathList.indexOf(route.fullPath) < 0) {
        this.fullPathList.push(route.fullPath)
        this.pages.push(route)
      }
      this.setTabsCache()
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    remove (targetKey) {
      this.pages = this.pages.filter(page => page.fullPath !== targetKey)
      this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
      this.setTabsCache()
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    selectedLastPath () {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
    },
    // 设置缓存
    setTabsCache () {
      const cacheList = this.pages.filter(item => item.meta.keepAlive).map(item => item.name)
      console.log(cacheList)
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
