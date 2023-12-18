<template>
  <!-- 每个路由只缓存当前的子路由 -->
  <keep-alive :include="cacheList">
    <router-view></router-view>
  </keep-alive>
  <!-- <router-view v-slot="{ Component, route }">
    <keep-alive :include="cacheList">
      <component :is="Component" :key="route.fullPath"/>
    </keep-alive>
  </router-view> -->
</template>
<script>
/**
 * @desc 子路由模板
 * 用于包含子路由但没有页面的组件上，只用来渲染子组件内容
 * 设置name用来防止在父级路由添加缓存时刷新缓存页
 * 一般多层级菜单缓存失效都是因为RouterView模板是动态的，切换时直接刷新了无法缓存
 * */
import { mapState } from 'vuex'
export default {
  name: 'RouteView',
  computed: {
    ...mapState({
      cacheList: state => state.publicVuex.cacheList
    })
  }
}
</script>
