<template>
  <a-modal :title="`${updateOrgDialog.type == 'edit' ? '编辑' : '添加'}单位`" :visible="true" :width="520" @cancel="closeDialog">
    <a-form-model ref="formRef" :model="formData" :rules="formRule" :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }">
      <a-form-model-item label="单位名称" prop="name">
        <a-input v-model="formData.name" placeholder="请输入单位名称"></a-input>
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="closeDialog">取消</a-button>
      <a-button type="primary" :loading="comfirmLoad" @click="submitConfirm">确定</a-button>
    </template>
  </a-modal>
</template>
<script>
/**
 * @desc 添加/编辑单位
 * @author changz
 * */

export default {
  name: 'UpdateOrg',
  props: {
    updateOrgDialog: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      comfirmLoad: false,
      formData: {
        id: 0,
        name: ''
      },
      formRule: {
        name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.updateOrgDialog.type === 'edit') {
      const { id, name } = this.updateOrgDialog.data
      this.formData.id = id
      this.formData.name = name
    }
  },
  methods: {
    submitConfirm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          const { id, name } = this.formData
          const params = {
            id,
            name
          }
          console.log(params)
          this.$message.success('操作成功')
          this.$emit('CLOSE_EVENT', true)
        } else {
          this.$message.warning('表单填写不完整')
        }
      })
    },

    closeDialog() {
      this.$emit('CLOSE_EVENT')
    }
  }
}
</script>
<style lang='less' scoped>
</style>