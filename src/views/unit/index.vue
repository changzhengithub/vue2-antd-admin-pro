<template>
  <div class="unit">
    <div class="unit-wrap">
      <h1>单位管理</h1>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Tab 1"> Content of Tab Pane 1 </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render> Content of Tab Pane 2 </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Unit',
  data() {
    return {
      tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川']
    }
  },
  activated() {
    console.log('111111')
  },
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
.unit {
  width: 100%;
  background-color: #fff;
  .unit-wrap {
    width: 100%;
    height: 2000px;
  }
}

</style>
