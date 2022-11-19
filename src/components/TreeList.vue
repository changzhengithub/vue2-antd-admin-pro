<template>
  <div class="tree">
    <div class="tree-item" v-for="(item, index) in treeList" :key="index">
      <div class="item-detail" :style="{'padding-left': depth * 20 + 'px'}" @click="toggleExpand(item)">
        <span>{{item.label}}</span>
      </div>
      <TreeList :depth="depth + 1" :treeList="item.children" @GET_DEPTH_EVENT="getDepth"></TreeList>
    </div>
  </div>
</template>
<script>
/**
 * 递归组件
 * */
export default {
  name: 'TreeList',
  props: {
    treeList: {
      type: Array,
      default: () => []
    },
    depth: {
      type: Number
    }
  },
  data() {
    return {
      isExpand: false
    }
  },
  methods: {
    toggleExpand(item) {
      this.$set(item, 'selectId', item.id)
      this.$emit('GET_DEPTH_EVENT', item)
    },
    getDepth(depth) {
      console.log(depth)
    }
  }
}
</script>
<style lang="less" scoped>
.tree {
  width: 100%;
  .tree-item {
    width: 100%;
    .item-detail {
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
    }
  }
}
</style>