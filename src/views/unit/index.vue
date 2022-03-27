<template>
  <div class="about">
    <h1>单位管理</h1>
    <a-button @click="togoPage(1)">详情</a-button>
  </div>
</template>
<script>
export default {
  name: 'Setting',
  data() {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']
    }
  },

  created() {},
  methods: {
    togoPage(id) {
      this.$router.push({
        name: 'UnitDetail',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
