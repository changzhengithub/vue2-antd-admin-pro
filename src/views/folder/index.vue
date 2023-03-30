<template>
  <div class="folder">
    <FolderList :treeList="treeList" :depth="0" v-on='$listeners' @TOGGLE_EXPAND_EVENT="toggleExpand" @OPERATE_FOLDER_EVENT="operateFolder"></FolderList>
  </div>
</template>
<script>

// import { deepClone } from '@/utils/util'
// import TreeItem from '@/components/TreeItem'
import FolderList from './components/FolderList'
export default {
  name: 'Folder',
  components: {
    // TreeItem,
    FolderList
  },
  data() {
    return {
      treeList: [
        {
          id: 1,
          label: '文件1',
          children: [
            {
              id: 12,
              label: '文件12',
              children: []
            },
            {
              id: 13,
              label: '文件13',
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
  created() {
    this.formatTreeData(this.treeList)
  },
  methods: {
    formatTreeData(list) {
      list.forEach(item => {
        this.$set(item, 'isExpand', false)
        if (item.children.length) {
          this.formatTreeData(item.children)
        }
      })
    },
    toggleExpand(id) {
      this.toggleFolderExpand(this.treeList, id)
    },
    toggleFolderExpand(list, id) {
      list.forEach(item => {
        if (item.id === id) {
          item.isExpand = !item.isExpand
        } else if (item.children.length) {
          this.toggleFolderExpand(item.children, id)
        }
      })
    },
    operateFolder(ob) {
      const { type, id } = ob
      if (type === 1) this.addFolder(this.treeList, id)
      if (type === 2) this.editFolder(this.treeList, id)
      if (type === 3) this.copyFolder(this.treeList, id)
      if (type === 4) this.delFolder(this.treeList, id)
    },
    addFolder(list, id) {
      list.forEach(item => {
        if (item.id === id) {
          const id = this.getMarkId()
          item.children.push({
            id,
            label: `文件-${id}`,
            children: [],
            isExpand: false
          })
        } else if (item.children.length) {
          this.addFolder(item.children, id)
        }
      })
    },
    copyFolder(list, id) {
      list.forEach(item => {
        if (item.id === id) {
          const id = this.getMarkId()
          list.push({
            id,
            label: `文件-${id}`,
            children: [],
            isExpand: false
          })
        } else if (item.children.length) {
          if (item.children.some(el => el.id === id)) {
            const id = this.getMarkId()
            item.children.push({
              id,
              label: `文件-${id}`,
              children: [],
              isExpand: false
            })
          } else {
            this.copyFolder(item.children, id)
          }
        }
      })
    },
    editFolder(list, id) {
      list.forEach(item => {
        if (item.id === id) {
          console.log(item.label)
        } else if (item.children.length) {
          this.editFolder(item.children, id)
        }
      })
    },
    delFolder(list, id) {
      const index = list.findIndex(item => item.id === id)
      if (index !== -1) {
        list.splice(index, 1)
      } else {
        list.forEach(item => {
          if (item.children.length) {
            this.delFolder(item.children, id)
          }
        })
      }
    },
    getMarkId() {
      const stamp = new Date().getTime()
      return stamp
    }
  }
}
</script>

<style lang="less" scoped>
.folder {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  .folder-wrap {
    width: 100%;
    height: 2000px;
  }
}

</style>
