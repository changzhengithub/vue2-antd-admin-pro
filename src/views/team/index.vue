<template>
  <div class="about">
    <h1>{{date}}</h1>
    <h1>{{diffDate}}</h1>
    <h1>{{stamp}}</h1>
  </div>
</template>
<script>

export default {
  name: 'Setting',
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
    console.log(this.f(6))
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
