<template>
  <div class="countup">
    <span ref="count" :style="countStyle"></span>
  </div>
</template>
<script>
/**
 * 数字滚动效果
 * @desc 数字展示进行滚动加载动画
 * @author changz
 * @param {Number} [startVal] - 起始值
 * @param {Number} [endVal] - 结束值
 * @param {Object} [countStyle] - 字体样式对象
 * @example 调用示例
 * <CountUp :startVal="0" :endVal="2000" :countStyle="{'font-size': '30px', 'color': 'blue'}"></CountUp>
 */

import CountUp from 'countup'
export default {
  name: 'CountUp',
  props: {
    startVal: {
      type: Number,
      default: 0
    },
    endVal: {
      type: Number,
      default: 0
    },
    // 文本样式
    countStyle: {
      type: Object
    }
  },
  data() {
    return {
      countUpInstance: null
    }
  },
  watch: {
    endVal(newVal) {
      this.endval = newVal
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.countUpInstance = new CountUp(this.$refs.count, this.startVal, this.endVal, 0, this.endVal < 100 ? 2 : 3)
      this.countUpInstance.start()
    }
  }
}
</script>
<style lang="less" scoped>
.countup {
  font-size: 24px;
  color: #333;
}
</style>
