<template>
  <div class="user">
    <h1>消息中心</h1>
  </div>
</template>
<script>
/**
 * @description 消息中心
 * @author changz
 * */
export default {
  name: 'User',
  data() {
    return {
      tags: ['很有想法的', '专注设计', '海纳百川']
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
