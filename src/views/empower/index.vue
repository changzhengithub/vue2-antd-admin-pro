<template>
  <div class="empower">
    <div class="empower-wrap">
      <div class="wrap-form">
        <a-form-model ref="empower" :model="formData" :rules="formRule" :label-col="{span: 4}" :wrapper-col="{span: 18}">
          <a-form-model-item label="用户名" prop="username">
            <a-input v-model="formData.username" placeholder="请输入用户名" />
          </a-form-model-item>
          <a-form-model-item label="密码" prop="password">
            <a-input v-model="formData.password" placeholder="请输入密码" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{offset: 4}">
            <a-button type="primary" :loading="submitLoad" @click="submitForm">提交</a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @description 登录页面
 * @author changz
 * */
import { mapActions } from 'vuex'

export default {
  name: 'Empower',
  data() {
    return {
      submitLoad: false,
      formData: {
        username: 'admin',
        password: 'admin'
      },
      formRule: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    ...mapActions(['Login']),

    submitForm() {
      this.$refs.empower.validate(valid => {
        if (valid) {
          const { username, password } = this.formData
          const params = {
            username,
            password
          }
          this.submitLoad = true
          this.Login(params)
            .then(res => {
              this.submitLoad = false
              if (res.code !== 200) {
                this.$notification.error({
                  message: '错误',
                  description: res.message
                })
                return
              }
              const data = res.data
              console.log(data)
              this.$router.push({ path: '/' })
              // 延迟 1 秒显示欢迎信息
              setTimeout(() => {
                this.$notification.success({
                  message: '欢迎',
                  description: '欢迎回来'
                })
              }, 1000)
            })
            .catch(err => {
              console.log(err)
              this.submitLoad = false
              this.$notification.error({
                message: '错误',
                description: '这是一条错误的提示消息'
              })
            })
        } else {
          this.$message.warning('表单填写不完整！')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.empower {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.jpg') center center no-repeat;
  background-size: 100% 100%;
  .empower-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9;
    width: 500px;
    transform: translate(-50%, -50%);
    .wrap-form {
      width: 100%;
      padding: 50px 30px 20px 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
