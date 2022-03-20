<template>
  <div class="global-header">
    <div class="header-operate">
      <div class="operate-collapse" @click="toggleCollapse">
        <a-icon type="menu-unfold" v-if="collapsed" />
        <a-icon type="menu-fold" v-else />
      </div>
    </div>
    <div class="header-user">
      <a-dropdown placement="bottomRight">
        <div class="user-name">
          <span>{{ userInfo.name }}</span>
        </div>
        <template v-slot:overlay>
          <a-menu class="ant-pro-drop-down">
            <a-menu-item @click="openPersonalInfo">
              <a-icon type="user" />
              <span>个人信息</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="logoutSubmit">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
/**
 * @description 头部右侧头像
 * @author changz
 * */
import { mapActions } from 'vuex'
import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'

export default {
  name: 'GlobalHeader',
  data() {
    return {
      userInfo: {}, // 个人信息
      collapsed: false // 是否折叠
    }
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
      this.$confirm({
        title: '提示',
        content: '确定要退出登录？',
        onOk: () => {
          return this.Logout().then((res) => {
            console.log(res)
            if (res.code !== 200) {
              this.$notification.error({
                message: '错误',
                description: res.message
              })
              return
            }
            this.$message.success(res.message)
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }).catch(err => {
            this.$notification.error({
              title: '错误',
              message: err.message
            })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.global-header {
  position: relative;
  .flex_vertical_center_horizontal_between();
  height: 64px;
  padding: 0 20px;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .header-operate {
    .operate-collapse {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .header-user {
    .flex_vertical_center();
    height: 100%;
    cursor: pointer;
  }
}

.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
