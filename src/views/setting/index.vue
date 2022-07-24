<template>
  <div class="setting">
    <a-button @click="getSelectCode">设置</a-button>
    <editor ref="myEditor" v-model="editcode" @init="initEditor" lang="sqlserver" :options="editorOptions" theme="chrome"></editor>
  </div>
</template>
<script>
import Editor from 'vue2-ace-editor'
import ace from 'brace'
export default {
  name: 'Setting',
  components: {
    Editor
  },
  data() {
    return {
      editor: null, // 编辑器实例
      editcode: 'SELECT * FROM TABLE',
      editorOptions: {
        // 设置代码编辑器的样式
        enableBasicAutocompletion: true, // 启用基本自动完成
        enableSnippets: true, // 启用代码段
        enableLiveAutocompletion: true, // 启用实时自动完成
        tabSize: 2, // 标签大小
        fontSize: 18, // 设置字号
        showPrintMargin: false // 去除编辑器里的竖线
      }
    }
  },

  created() {
    // this.getTeams()
    this.$nextTick(() => {
      // 获取实例对象
      this.editor = this.$refs.myEditor.editor
      // 事件监听
      // this.editor.getSession().on('change', (e) => {
      //   console.log(e)
      // })

      this.editor.getSession().on('changeSelection', e => {
        console.log(e)
      })
    })
  },
  methods: {
    // 初始化方法
    initEditor() {
      require('brace/mode/sqlserver')
      require('brace/theme/chrome')
      require('brace/ext/emmet')
      require('brace/ext/language_tools') // language extension prerequsite...

      const that = this
      const completer = {
        getCompletions: function (editors, session, pos, prefix, callback) {
          that.setCompleteData(editors, session, pos, prefix, callback)
        }
      }
      const lnTools = ace.acequire('ace/ext/language_tools')
      lnTools.addCompleter(completer)
    },
    setCompleteData(editor, session, pos, prefix, callback) {
      const data = [
        {
          meta: '表名', // 描述
          caption: 'sonic', // 展示出的名字（一般与value值相同）
          value: 'sonic', // 数据值
          score: 1 // 权重 数值越大 提示越靠前
        },
        {
          meta: '库名',
          caption: 'sonww',
          value: 'sonww',
          score: 2
        }
      ]
      if (prefix.length === 0) {
        return callback(null, [])
      } else {
        return callback(null, data)
      }
    },
    editorInit() {
      require('brace/mode/sqlserver')
      require('brace/theme/chrome')
      require('brace/ext/emmet')
      require('brace/ext/language_tools') // language extension prerequsite...
    },
    codeChange(val) {
      console.log(val)
    },
    // 获取选中代码
    getSelectCode() {
      const code = this.editor.session.getTextRange(this.editor.getSelectionRange())
      console.log(code)
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  width: 100%;
  height: 300px;
  text-overflow: ellipsis;
}
</style>
