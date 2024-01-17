<template>
  <div class="global-header">
    <div class="header-operate">
      <div class="operate-collapse" @click="toggleCollapse">
        <a-icon type="menu-unfold" v-if="collapsed" />
        <a-icon type="menu-fold" v-else />
      </div>
    </div>
    <div class="header-right">
      <div class="right-operate">
        <div class="operate-item">
          <a-tooltip title="消息中心">
            <a-badge dot :count="userInfo.unread_msg_nums">
              <a-icon type="bell" @click="gotoPage('MessageCenter')" />
            </a-badge>
          </a-tooltip>
        </div>
      </div>
      <HeaderRight mode="left"></HeaderRight>
    </div>
  </div>
</template>

<script>
/**
 * @description 基础布局头部
 * @author changz
 * */
import { mapActions } from 'vuex'
import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'

import HeaderRight from './HeaderRight'

export default {
  name: 'GlobalHeader',
  components: {
    HeaderRight
  },
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

    gotoPage(name) {
      this.$router.push({
        name
      })
    },

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

  .header-right {
    display: flex;
    align-items: center;
    height: 100%;
    .right-operate {
      display: flex;
      .operate-item {
        margin-right: 16px;
        font-size: 14px;
        color: #4E5969;
        cursor: pointer;
      }
    }
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
