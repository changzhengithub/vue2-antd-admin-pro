<template>
  <a-modal :visible="true" title="权限配置" :width="700" @cancel="closeDialog">
    <a-spin :spinning="loading">
      <div class="permission-table">
        <div class="table-header">
          <div class="header-module">
            <span>查看权限</span>
            <a-checkbox v-model="moduleCheck" style="margin-left: 15px" @change="checkAllPerm">全选</a-checkbox>
          </div>
          <div class="header-control">操作权限</div>
        </div>
        <div class="table-body">
          <div class="body-row" v-for="(page, index) in permissionList" :key="index">
            <div class="row-module">
              <a-checkbox v-model="page.isCheck" :disabled="page.isDisable" :indeterminate="page.indeterminate" @change="() => checkPage(page)">
                {{ page.title }}
              </a-checkbox>
            </div>
            <div class="row-control">
              <div class="control-check" v-if="page.operateList.length">
                <div class="check-box" v-show="operate.isShow" v-for="(operate, i) in page.operateList" :key="i">
                  <a-checkbox v-model="operate.isCheck" @change="() => checkOperate(page, operate)">
                    {{ operate.title }}
                  </a-checkbox>
                </div>
              </div>
              <a-tag v-else color="orange">无操作权限</a-tag>
            </div>
          </div>
        </div>
      </div>
    </a-spin>

    <template slot="footer">
      <a-button @click="closeDialog">取消</a-button>
      <a-button type="primary" :loading="confirmLoading" @click="saveAuth">保存</a-button>
    </template>
  </a-modal>
</template>
<script>
/**
 * @description 设置权限
 * @author changz
 **/
import permissionList from '@/json/permission.json'

export default {
  name: 'setPermission',
  props: {
    id: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      permissionList, // 所有权限列表，后期可以通过接口获取该厂商对应的所有模块
      loading: false,
      confirmLoading: false,
      moduleCheck: false, // 查看全选
      roleMenuList: [],
      roleOperateList: []
    }
  },

  created() {
    this.setPermission()
  },
  methods: {
    // 设置已选权限
    setPermission() {
      this.permissionList.forEach(page => {
        const perm = page.permList[0].perm
        if (this.roleMenuList.includes(perm)) {
          page.isCheck = true
        } else {
          page.isCheck = false
        }
        if (page.operateList.length) {
          page.operateList.forEach(ele => {
            if (this.roleOperateList.includes(ele.perm)) {
              ele.isCheck = true
              // if (ele.perm === 'other_attack_event_per' || ele.perm === 'threat_warn_aggregation_per') {
              //   ele.isShow = true
              // }
            } else {
              ele.isCheck = false
            }
          })
        }
      })
    },

    // 页面权限
    checkPage(page) {
      const isCheck = page.isCheck
      this.$set(page, 'indeterminate', false)
      page.operateList.forEach(item => {
        this.$set(item, 'isCheck', isCheck)
        // if (item.perm === 'threat_warn_event_per' || item.perm === 'threat_warn_aggregation_per') {
        //   item.isShow = isCheck
        // }
      })
      this.moduleCheck = this.permissionList.every(item => item.isCheck)
    },
    // 操作权限
    checkOperate(page, operate) {
      // if (operate.perm === 'threat_warn_per') {
      //   this.$set(page.operateList[2], 'isCheck', operate.isCheck)
      //   this.$set(page.operateList[2], 'isShow', operate.isCheck)
      //   this.$set(page.operateList[3], 'isShow', operate.isCheck)
      //   this.$set(page.operateList[3], 'isCheck', operate.isCheck)
      // }
      const hasSelect = page.operateList.some(item => item.isCheck)
      if (hasSelect) this.$set(page, 'isCheck', true)
    },

    // 首页模块
    checkAllPerm() {
      this.permissionList.forEach(item => {
        this.$set(item, 'isCheck', this.moduleCheck)
        item.operateList.forEach(item => {
          this.$set(item, 'isCheck', this.moduleCheck)
        })
      })
    },

    // 保存权限
    saveAuth() {
      const checkPageList = this.permissionList.filter(item => item.isCheck)

      // 获取页面权限
      const chekcPagePermList = checkPageList.flatMap(item => item.permList)
      // 根据perm去重
      const uniqueMap = new Map()
      const menu_perm = chekcPagePermList.filter(item => !uniqueMap.has(item.perm) && uniqueMap.set(item.perm, 1))

      const checkOperateList = checkPageList.flatMap(item => item.operateList)
      const operate_perm = checkOperateList.filter(item => item.isCheck).map(item => ({ perm: item.perm, title: item.title }))
      console.log(menu_perm)
      console.log(operate_perm)
    },
    closeDialog() {
      this.$emit('CLOSE_EVENT')
    }
  }
}
</script>
<style lang="less" scoped>
.permission-table {
  width: 100%;
  border: 1px solid #ddd;
  .table-header {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #ddd;
    .header-module {
      position: relative;
      display: flex;
      align-items: center;
      width: 30%;
      padding: 10px 20px 10px 25px;
      &::after {
        position: absolute;
        top: 50%;
        right: 0;
        z-index: 9;
        content: '';
        height: 20px;
        border-left: 1px solid #ddd;
        transform: translateY(-50%);
      }
    }
    .header-control {
      width: 70%;
      padding: 10px 20px 10px 25px;
    }
  }
  .table-body {
    width: 100%;
    .body-row {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ddd;
      &:last-of-type {
        border-bottom: none;
      }
      .row-module {
        position: relative;
        width: 30%;
        padding: 10px 20px;
        &::after {
          position: absolute;
          top: 50%;
          z-index: 9;
          right: 0;
          content: '';
          height: 20px;
          border-left: 1px solid #ddd;
          transform: translateY(-50%);
        }
      }
      .row-control {
        width: 70%;
        padding: 10px 20px;
        .control-check {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          .check-box {
            width: 33.3%;
          }
        }
      }
    }
  }
}
</style>