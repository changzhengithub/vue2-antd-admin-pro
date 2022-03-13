<template>
  <div class="global-header">
    <div class="header-left">
      <el-button size="small" @click="toggleCollapse">
        <i class="el-icon-s-fold" v-if="collapsed"></i>
        <i class="el-icon-s-unfold" v-else></i>
      </el-button>
    </div>
    <div class="header-right">
      <el-dropdown>
        <div class="right-info">
          <el-avatar :size="36" :src="userInfo.avatar"></el-avatar>
          <div class="info-name"><span>{{ userInfo.name }}</span></div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="userInfo.is_admin != 1" @click="openPersonalInfo">个人信息</el-dropdown-item>
          <el-dropdown-item @click="logoutSubmit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
/**
 * @description 头部右侧头像
 * @author changz
 * */
import { mapActions, mapState } from 'vuex'
import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'

export default {
  name: 'GlobalHeader',
  data() {
    return {
      userInfo: {}, // 个人信息
      collapsed: false, // 是否折叠
      memberDetail: {
        visible: false,
        id: ''
      }
    }
  },
  computed: {
    ...mapState([])
  },
  created() {
    this.userInfo = storage.get(USER_INFO)
  },
  methods: {
    ...mapActions(['Logout']),

    openPersonalInfo() {
      this.$router.push({
        name: 'User'
      })
    },
    // 折叠展开导航栏
    toggleCollapse() {
      this.collapsed = !this.collapsed
      this.$emit('COLLAPSE_EVENT')
    },
    // 退出登录
    logoutSubmit() {
      console.log(111)
      this.$confirm('确定要退出登录？?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Logout()
          .then(() => {
            window.location.href = '/'
          })
          .catch((err) => {
            this.$notify.error({
              title: '错误',
              message: err.message
            })
            window.location.href = '/'
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.global-header {
  // .flex_vertical_center_horizontal_between();
  width: 100%;
  height: 100%;

  .header-right {
    // .flex_vertical_center();
    height: 100%;
    .right-info {
      // .flex_vertical_center();
      .info-name {
        padding-left: 10px;
        text-align: right;
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        margin-bottom: 2px;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
