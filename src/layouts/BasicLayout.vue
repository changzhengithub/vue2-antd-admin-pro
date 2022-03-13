<template>
  <el-container class="basic">
    <!-- 侧边导航栏 start -->
    <div class="basic-aside" >
      <div class="aside-logo">
        <img src="@/assets/images/logo.svg" alt="" />
        <div class="logo-title">EleAdmin</div>
      </div>
      <div class="aside-menu">
        <el-menu :default-active="selectedKeys" :collapse="collapsed" @select="onClickMenuItem">
          <template v-for="item in menuList">
            <el-menu-item :key="item.path" :index="item.path" v-if="!item.children">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
            <el-submenu v-if="item.children" :key="item.path" :index="item.path">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
              <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ subItem.meta.title }}</span>
              </el-menu-item>
              <!-- <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu> -->
            </el-submenu>
          </template>
        </el-menu>
      </div>
    </div>

    <!-- 侧边导航栏 end -->
    <el-container>
      <!-- 头部 start -->
      <el-header>
        <GlobalHeader @COLLAPSE_EVENT="onCollapse"></GlobalHeader>
      </el-header>
      <!-- 头部 end -->
      <el-container>
        <el-main class="basic-layout">
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>

  <!-- <a-layout class="basic">
    <a-layout-sider hide-trigger collapsible :collapsed="collapsed">
      <div class="logo">
        <img src="@/assets/images/logo.png" alt="" />
        <div class="logo-title">综合管理系统</div>
      </div>
      <a-menu :selected-keys="selectedKeys" :auto-open="true" @menuItemClick="onClickMenuItem">
        <template v-for="item in menuList">
          <a-menu-item :key="item.path" v-if="!item.children">
            <arcoIcon :icon="item.meta.icon"></arcoIcon>
            {{ item.meta.title }}
          </a-menu-item>
          <a-sub-menu v-if="item.children" :key="item.path">
            <template #title>
              <span><arcoIcon :icon="item.meta.icon"></arcoIcon>{{ item.meta.title }}</span>
            </template>
            <a-menu-item v-for="subItem in item.children" :key="subItem.path">
              <arcoIcon :icon="subItem.meta.icon"></arcoIcon>
              {{ subItem.meta.title }}
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <GlobalHeader @COLLAPSE_EVENT="onCollapse"></GlobalHeader>
      </a-layout-header>

      <a-layout class="basic-layout">
        <div class="layout-content">
          <div class="content-main">
            <router-view />
          </div>
        </div>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout> -->
</template>

<script>
// import { asyncRouterMap } from '@/router/router.config'
import { mapState } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader'

export default {
  components: {
    GlobalHeader
  },

  data() {
    return {
      collapsed: false, // 折叠导航栏
      menuList: [],
      currentRoute: '',
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    ...mapState({
      routerList: state => state.empower.routerList
    })
  },

  created() {
    const menuList = this.getMeunList(this.routerList)
    this.menuList = menuList[0].children
    // this.menuList = asyncRouterMap[0].children
    this.selectedKeys = this.$route.path
  },
  methods: {
    // 获取路由列表
    getMeunList(routerList) {
      const menuList = routerList.filter(item => {
        if (!item.hidden) {
          if (item.children && item.children.length) {
            // console.log(item.children);
            item.children = this.getMeunList(item.children)
          }
          return true
        }
        return false
      })
      return menuList
    },

    // 折叠展开导航栏
    onCollapse() {
      this.collapsed = !this.collapsed
    },

    // 路由跳转
    onClickMenuItem(key) {
      console.log(key)
      this.selectedKeys = key
      this.$router.push({
        path: key
      })
    }
  }
}
</script>

<style lang="less" scoped>
.basic {
  width: 100%;
  background-color: #fff;
  .basic-aside {
    width: 256px;
    height: 100vh;
    background: #001529;
    transition: all .3s;
    .aside-logo {
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      padding-left: 16px;
      background: #001529;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      // transition: all 0.3s;
      img {
        width: 30px;
        height: 30px;
      }
      .logo-title {
        margin-left: 12px;
        font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        vertical-align: middle;
      }
    }
    .aside-menu {
      width: 100%;
      height: calc(100% - 60px);
      overflow-y: auto;
    }
    .logo-toggle {
      width: 64px;
    }
  }


  .basic-layout {
    background-color: #f2f2f2;
  }
}
</style>
