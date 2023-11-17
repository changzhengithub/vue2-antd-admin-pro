<template>
  <div class="team">
    <h1>团队管理</h1>
    <a-select default-value="lucy" style="width: 220px">
      <a-select-option value="jack"> Jack </a-select-option>
      <a-select-option value="lucy"> Lucy </a-select-option>
      <a-select-option value="disabled" disabled> Disabled </a-select-option>
      <a-select-option value="Yiminghe"> yiminghe </a-select-option>
    </a-select>
    <a-input v-model="date"></a-input>
    <h1>{{ date }}</h1>
    <h1>{{ diffDate }}</h1>
    <h1>{{ stamp }}</h1>
  </div>
</template>
<script>
export default {
  name: 'Team',
  data() {
    return {
      date: '',
      diffDate: '',
      stamp: '',
      arr: [1, 1, 2, 3, 5, 8, 13],
      arr2: [1, 2, 3, 4, 5, 6]
    }
  },

  created() {
    // this.formatDate()
    // console.log(this.f(6))
  },
  activated() {
    console.log('2222')
  },

  methods: {
    // formatDate() {
    //   f(0) = 1
    //   f(1) = 1
    //   f(2) = 1 + 1 = 2
    //   f(3) = 1 + 2 = 3
    //   f(n) = f(n - 2) + f(n - 1)
    // }
    f(n) {
      if (n < 2) return 1
      console.log(n)
      return this.f(n - 1) + this.f(n - 2)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
