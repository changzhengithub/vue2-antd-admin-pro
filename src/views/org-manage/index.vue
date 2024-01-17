<template>
  <div class="org">
    <div class="org-header">
      <a-button type="primary" @click="openAddOrg">添加单位</a-button>
    </div>
    <a-table
      rowKey="id"
      :columns="tableColumn"
      :loading="tableLoad"
      :data-source="tableData"
      :pagination="pagination"
      @change="tableChange"
    >
      <template slot="operate" slot-scope="record">
        <a-button type="link" size="small" @click="editOrg(record)">编辑</a-button>
        <a-button type="link" size="small" style="color: red" @click="deleteRole(record)">删除</a-button>
      </template>
    </a-table>

    <!-- 添加编辑 弹窗 start -->
    <UpdateOrg v-if="updateOrgDialog.visible" :updateOrgDialog="updateOrgDialog" @CLOSE_EVENT="closeUpdateOrg"> </UpdateOrg>
    <!-- 添加编辑 弹窗 end -->
  </div>
</template>
<script>
/**
 * @description 组织管理
 * @author changz
 * */
import UpdateOrg from './component/UpdateOrg'

export default {
  name: 'roleManage',
  components: {
    UpdateOrg
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
          title: '名称',
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
        { id: 100, name: '技术部', desc: '技术部' },
        { id: 101, name: '综合部', desc: '综合部' },
        { id: 102, name: '人力资源部', desc: '人力资源部' }
      ],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showSizeChanger: true,
        showQuickJumper: false
      },

      updateOrgDialog: {
        visible: false,
        type: '',
        data: {}
      }
    }
  },
  methods: {
    // 添加单位
    openAddOrg() {
      this.updateOrgDialog.visible = true
      this.updateOrgDialog.type = 'add'
    },
    editOrg(record) {
      this.updateOrgDialog.visible = true
      this.updateOrgDialog.data = JSON.parse(JSON.stringify(record))
      this.updateOrgDialog.type = 'edit'
    },
    // 关闭弹窗
    closeUpdateOrg(refresh) {
      this.updateOrgDialog.visible = false
      if (refresh) {
        console.log(2222)
      }
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
.org {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .org-header {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>