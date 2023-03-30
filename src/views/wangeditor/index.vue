<template>
  <div class="setting">
    <a-button @click="setUserIdFn">设置ID</a-button>
    <a-button @click="setUserName">子模块</a-button>
    <span>{{root}}</span>
    <span>{{userId}}</span>
    <!-- <span>{{rootUserName}}</span> -->
    <span>{{childUserName}}</span>
  </div>
</template>
<script>
/**
 * @desc 设置
 * @author xxx
 * */

import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      editor: null // 编辑器实例
    }
  },

  computed: {
    ...mapState(['root']),
    ...mapState({
      userId: state => state.publicVuex.userId
    }),
    // ...mapState({
    //   rootUserName: 'userName',
    //   childUserName: state => state.publicVuex.userName
    // }),

    ...mapState('publicVuex', {
      childUserName: state => state.userName
    })
  },
  created() {
    console.log(this.$store.state)
    console.log(this.userId)

    // console.log(this.rootUserName)
    console.log(this.childUserName)
  },
  methods: {
    ...mapMutations(['setName', 'publicVuex/setUserId', 'publicVuex/setName']),
    // ...mapMutations({
    //   aSetUserId: 'publicVuex/setUserId',
    //   aSetName: 'publicVuex/setName'
    // }),

    ...mapMutations('publicVuex', {
      aSetUserId: 'setUserId',
      aSetName: 'setName'
    }),

    setUserIdFn() {
      this.setName('xxxx')
      this['publicVuex/setUserId'](100)
      this['publicVuex/setName']('changz') // 同时调用根节点和子模块
    },
    setUserName() {
      this.aSetUserId(123)
      this.aSetName('xiaoming')
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  width: 100%;
  height: 300px;
  padding: 20px;
  background-color: #fff;
}
</style>
