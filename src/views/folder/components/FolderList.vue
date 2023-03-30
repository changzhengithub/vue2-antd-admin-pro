<template>
  <div class="tree">
    <div class="tree-item" v-for="(item, index) in treeList" :key="index">
      <div class="item-detail" :style="{'padding-left': depth * 20 + 10 + 'px'}"  @click="toggleExpand(item)">
        <div class="detail-icon" v-if="item.children.length">
          <a-icon type="folder" v-if="!item.isExpand" />
          <a-icon type="folder-open" v-else />
        </div>
        <div class="detail-icon" v-else>
          <a-icon type="file" />
        </div>
        <span>{{item.label}}</span>
        <div class="detail-operate">
          <a-tooltip title="添加">
            <a-icon type="plus-square" @click.stop="operateFolder(1, item)" />
          </a-tooltip>
          <a-tooltip title="编辑">
            <a-icon type="edit" @click.stop="operateFolder(2, item)" />
          </a-tooltip>
          <a-tooltip title="复制">
            <a-icon type="copy" v-if="!item.children.length" @click.stop="operateFolder(3, item)" />
          </a-tooltip>
          <a-tooltip title="删除">
            <a-icon type="delete" style="color: #f50" @click.stop="operateFolder(4, item)" />
          </a-tooltip>
        </div>
      </div>
      <div class="item-wrap" :style="{height: item.isExpand ? 'auto' : 0}">
        <FolderList v-if="item.children.length" :depth="depth + 1" :treeList="item.children" v-on='$listeners'></FolderList>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 递归组件
 * */
export default {
  name: 'FolderList',
  // inheritAttrs: true,
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
      if (!item.children.length) return
      this.$emit('TOGGLE_EXPAND_EVENT', item.id)
    },
    operateFolder(type, item) {
      const ob = {
        depth: this.depth,
        type,
        id: item.id
      }
      this.$emit('OPERATE_FOLDER_EVENT', ob)
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
      border-radius: 4px;
      .detail-icon {
        margin-right: 5px;
      }
      .detail-operate {
        display: none;
        .anticon {
          margin-left: 10px;
        }
      }

      &:hover {
        color: #0f65dd;
        background-color: #f2f3f5;

        .detail-operate {
          display: block;
        }
      }
    }
    .item-wrap {
      width: 100%;
      overflow: hidden;
      transition: all .3s;
    }
  }
}
</style>