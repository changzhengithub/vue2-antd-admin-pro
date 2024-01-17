<template>
  <div class="role">
    <a-table
      rowKey="id"
      :columns="tableColumn"
      :loading="tableLoad"
      :data-source="tableData"
      :pagination="pagination"
      @change="tableChange"
    >
      <template slot="operate" slot-scope="scope">
        <a-button type="link" size="small" @click="openSetPermission(scope)">权限</a-button>
        <a-button type="link" size="small" style="color: red" @click="deleteRole(scope)">删除</a-button>
      </template>
    </a-table>

    <!-- 权限 弹窗 start -->
    <setPermission v-if="permistionDialogData.visible" :id="permistionDialogData.id" @CLOSE_EVENT="closeAuthDialog"> </setPermission>
    <!-- 权限 弹窗 end -->
  </div>
</template>
<script>
/**
 * @description 角色管理
 * @author changz
 * */
import setPermission from './component/setPermission'

export default {
  name: 'roleManage',
  components: {
    setPermission
  },
  data() {
    return {
      tableLoad: false,
      tableColumn: [
        {
          title: '编号',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '描述',
          dataIndex: 'desc',
          scopedSlots: { customRender: 'desc' }
        },
        {
          title: '操作',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'operate' }
        }
      ],
      tableData: [
        { id: 100, name: '超级管理员', desc: '超级管理员' },
        { id: 101, name: '管理员', desc: '管理员' },
        { id: 102, name: '普通用户', desc: '普通用户' }
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: false
      },

      // 权限 控制 弹窗
      permistionDialogData: {
        visible: false,
        id: '',
        authId: [], // 当前用户所有的权限id
        authDataList: []
      }
    }
  },
  methods: {
    // 打开权限设置
    openSetPermission(record) {
      if (record.id === 1) return
      this.permistionDialogData.visible = true
      this.permistionDialogData.id = record.id
    },
    // 关闭权限弹窗
    closeAuthDialog() {
      this.permistionDialogData.visible = false
    },


    // 删除
    deleteRole(row) {
      // const that = this
      this.$confirm({
        title: '确认要删除当前数据',
        okType: 'danger',
        onOk() {
          console.log(111)
        }
      })
    },
    resetGetListData() {
      this.pagination.current = 1
    },

    tableChange(pagination, filters, sorter) {
      this.pagination = pagination
    }
  }
}
</script>
<style lang="less" scoped>
.role {
  width: 100%;
  padding: 20px;
  background-color: #fff;
}
</style>
