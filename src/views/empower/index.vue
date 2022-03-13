<template>
  <div class="empower">
    <div class="empower-wrap">
      <div class="wrap-form">
        <el-form :model="formData" ref="empower" label-width="80px">
          <el-form-item prop="username" label="用户名" :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" :loading="submitLoad" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
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
        password: 'admin',
        username: 'admin'
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
                this.$notify.error({
                  title: '错误',
                  message: res.message
                })
              }
              const data = res.data
              console.log(data)
              this.$router.push({ path: '/' })
              // 延迟 1 秒显示欢迎信息
              setTimeout(() => {
                this.$notify.success({
                  title: '欢迎',
                  message: '欢迎回来'
                })
              }, 1000)
            })
            .catch(err => {
              console.log(err)
              this.submitLoad = false
              this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息'
              })
            })
        } else {
          console.log('error submit!!')
          return false
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
      padding: 50px 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
