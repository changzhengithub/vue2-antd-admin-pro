<template>
  <div class="user">
    <h1>用户信息</h1>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']
    }
  },

  created() {
    // this.getTeams()
  },
  methods: {
    getTeams() {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
