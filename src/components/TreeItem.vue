<template>
  <div class="tree">
    <div class="tree-detail" :style="{'padding-left': depth * 20 + 'px'}" @click="toggleExpand(depth)">
      <span>{{treeData.label}}</span>
    </div>
    <template v-if="treeData.children && treeData.children.length && isExpand">
      <TreeItem v-for="(item, index) in treeData.children" :depth="depth + 1" :treeData="item" :key="index" @GET_DEPTH_EVENT="getDepth"></TreeItem>
    </template>
  </div>
</template>
<script>
/**
 * 递归组件
 * */
export default {
  name: 'TreeItem',
  props: {
    treeData: {
      type: Object,
      default: () => {}
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
    toggleExpand(depth) {
      this.$emit('GET_DEPTH_EVENT', depth)
      this.isExpand = !this.isExpand
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
  .tree-detail {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }
}
</style>