<template>
  <div class="unit">
    <!-- <TreeItem v-for="(item, index) in treeList" :key="index" :depth="0" :treeData="item" @GET_DEPTH_EVENT="getDepth"></TreeItem> -->
    <button @click="getDataList">获取数据</button>
    <TreeList :treeList="treeList" :depth="0" @GET_DEPTH_EVENT="getDepth"></TreeList>
  </div>
</template>
<script>
// import TreeItem from '@/components/TreeItem'
import TreeList from '@/components/TreeList'
export default {
  name: 'Unit',
  components: {
    // TreeItem,
    TreeList
  },
  data() {
    return {
      treeList: [
        {
          id: 1,
          label: '文件1',
          children: [
            {
              id: 11,
              label: '文件11',
              children: [
                {
                  id: 111,
                  label: '文件111',
                  children: []
                },
                {
                  id: 112,
                  label: '文件112',
                  children: []
                }
              ]
            },
            {
              id: 12,
              label: '文件12',
              children: []
            },
            {
              id: 12,
              label: '文件12',
              children: []
            }
          ]
        },
        {
          id: 2,
          label: '文件2',
          children: []
        }
      ]
    }
  },
  activated() {
    console.log('111111')
  },
  methods: {
    getDataList() {
      console.log(this.treeList)
    },
    getDepth(depth) {
      console.log(depth)
    }
  }
}
</script>

<style lang="less" scoped>
.unit {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .unit-wrap {
    width: 100%;
    height: 2000px;
  }
}

</style>
