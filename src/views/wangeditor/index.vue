<template>
  <div class="docs-wrap">
    <div class="wrap-toolbar">
      <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    </div>
    <div class="wrap-container">
      <div class="container-editor">
        <div class="editor-title">
          <input v-model="editorTitle" type="text" v-focus placeholder="无标题" />
        </div>
        <div ref="editRef" class="editor-area" id="editor-area" v-viewer>
          <Editor v-model="editorText" :defaultConfig="editorConfig" :mode="mode" @onCreated="onCreated" @onChange="onChange" />
        </div>
      </div>
    </div>
    <div class="wrap-catalog">
      <a-button @click="getHtml">获取文本</a-button>
      <div class="catalog-title">大纲</div>
      <ul id="editor-cata"></ul>
    </div>


    <a-modal title="查看图片" :visible="previewDialog.visible" :width="560" :footer="null" @cancel="previewDialog.visible = false">
      <img :src="previewDialog.url" style="max-width: 100%" alt="">
    </a-modal>
  </div>
</template>
<script>
/**
 * 页面编辑组件
 * @desc 编辑页面弹窗组件
 * @author changz
 * @param {Object} [docsEditorDialog] - 弹窗对象
 * @param {Array} [breadPath] - 面包屑列表
 * @example 调用示例
 * <DocsEditor v-if="docsEditorDialog.visible" :docsEditorDialog="docsEditorDialog" :breadPath="breadPath" @CREATE_PAGE_EVENT="createPageRefresh" @CLOSE_DIALOG_EVENT="closeDocsEditor"></DocsEditor>
 */

import storage from 'store'
import message from 'ant-design-vue/es/message'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { Boot, SlateNode } from '@wangeditor/editor'
// markdown语法
// import markdownModule from '@wangeditor/plugin-md'
// import ctrlEnterModule from '@wangeditor/plugin-ctrl-enter'
// import linkCardModule from '@wangeditor/plugin-link-card'

// 自定义菜单
class UploadMenu {
  constructor() {
    this.title = '上传附件'
    this.iconSvg = '<svg t="1671283908578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1624" width="48" height="48"><path d="M924.672 126.976q36.864 36.864 54.784 82.432t17.92 93.696-17.92 93.696-54.784 82.432l-392.192 389.12q-36.864 36.864-90.624 61.44t-113.664 28.672-122.368-16.384-115.712-73.728q-52.224-52.224-72.704-113.152t-16.384-121.344 28.16-113.664 60.928-90.112l348.16-345.088q9.216-9.216 27.136-4.608t27.136 13.824q8.192 9.216 13.312 27.136t-4.096 27.136l-347.136 344.064q-27.648 27.648-46.08 64.512t-21.504 78.848 12.288 84.992 55.296 82.944q35.84 35.84 79.36 50.688t86.528 12.288 81.92-18.944 66.56-44.032l391.168-388.096q27.648-27.648 39.424-57.344t11.264-58.88-13.824-56.832-36.864-51.2q-44.032-43.008-98.816-40.448t-110.08 57.856l-353.28 351.232q-23.552 23.552-23.04 52.224t18.944 47.104q22.528 22.528 51.712 18.432t47.616-22.528l320.512-318.464q9.216-9.216 27.136-4.608t27.136 13.824 14.336 27.136-4.096 27.136l-321.536 318.464q-36.864 36.864-70.656 51.2t-63.488 12.8-55.296-15.872-47.104-34.816q-17.408-16.384-31.232-41.984t-15.872-56.32 10.752-65.536 49.664-70.656q18.432-18.432 32.768-33.792 12.288-13.312 23.04-23.552t11.776-11.264l285.696-284.672q36.864-36.864 80.384-57.856t88.576-24.064 88.576 12.288 80.384 52.224z" fill="#595959" p-id="1625"></path></svg>'
    this.tag = 'button'
  }

  getValue(editor) {
    return ''
  }

  isActive(editor) {
    return false // or true
  }

  isDisabled(editor) {
    return false // or true
  }

  exec(editor, value) {
    console.log(editor)
  }
}
const UploadMenuConf = {
  key: 'UploadMenu',
  factory() {
    return new UploadMenu()
  }
}
// Boot.registerModule(ctrlEnterModule)
// Boot.registerModule(linkCardModule)
// Boot.registerModule(markdownModule)
Boot.registerMenu(UploadMenuConf)


// 图片上传接口配置
const baseUrl = process.env.VUE_APP_API_BASE_URL
const token = storage.get(ACCESS_TOKEN)

export default {
  name: 'Setting',
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      baseUrl,
      editor: null,
      editorTitle: '',
      editorText: '<p><img src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF" alt="" data-href="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF" style=""/></p>',
      headerContainer: null,
      headerList: [],
      mode: 'default', // or 'simple'
      // 工具栏配置
      toolbarConfig: {
        toolbarKeys: [
          // 菜单 key
          'headerSelect',
          'blockquote',
          '|', // 分割线
          'bold',
          'underline',
          'italic',
          'through',
          'code',
          '|',
          'color',
          'bgColor',
          '|',
          'fontSize',
          'fontFamily',
          'lineHeight',
          '|',
          'bulletedList',
          'numberedList',
          // 菜单组
          {
            key: 'group-justify',
            title: '对齐',
            iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
            menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
          },
          {
            key: 'group-indent',
            title: '缩进',
            iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
            menuKeys: ['indent', 'delIndent']
          },
          '|',
          'emotion',
          'insertLink',
          {
            key: 'group-image',
            title: '图片',
            iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
            menuKeys: ['insertImage', 'uploadImage']
          },
          {
            key: 'group-video',
            title: '视频',
            iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>',
            menuKeys: ['insertVideo', 'uploadVideo']
          },
          'insertTable',
          'UploadMenu',
          'codeBlock',
          'divider',
          '|',
          'undo',
          'redo',
          '|',
          'clearStyle'
        ]
      },
      // 编辑器基础配置
      editorConfig: {
        placeholder: '请输入内容...',
        autoFocus: false,
        readOnly: true,
        // 工具栏里某个菜单配置
        MENU_CONF: {
          // 上传图片的配置
          uploadImage: {
            server: `${baseUrl}/api/user/uploadFile`,
            fieldName: 'file',
            meta: {
              editor_upload: 1
            },
            headers: {
              Authorization: token
            },
            base64LimitSize: 10 * 1024 // 小于10kb
          },
          // 上传视频的配置
          uploadVideo: {
            server: `${baseUrl}/api/user/uploadFile`,
            fieldName: 'file',
            meta: {
              editor_upload: 1
            },
            headers: {
              Authorization: token
            },
            maxFileSize: 2 * 1024 * 1024, // 2M
            maxNumberOfFiles: 1,
            allowedFileTypes: ['video/*'],
            onFailed(file, err, res) {
              message.error(err.message)
            },
            onError(file, err, res) {
              message.error(err.message)
            }
          }
        }
        // 鼠标悬浮显示菜单配置
        // hoverbarKeys: {}
      },
      previewDialog: {
        visible: false,
        url: ''
      }
    }
  },
  created() {},
  mounted() {
    const editorDom = document.getElementById('editor-area')
    console.log(editorDom)
    // editorDom.addEventListener('click', this.getClickDom)
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // 点击空白处 focus 编辑器
      document.getElementById('editor-area').addEventListener('click', e => {
        if (e.target.id === 'editor-area') {
          this.editor.blur()
          this.editor.focus(true) // focus 到末尾
        }
      })
      // 标题 DOM 容器
      this.headerContainer = document.getElementById('editor-cata')
      const wrapDom = document.getElementsByClassName('wrap-container')[0]
      this.headerContainer.addEventListener('mousedown', event => {
        if (event.target.tagName !== 'LI') return
        event.preventDefault()
        const id = event.target.id
        const sTop = document.getElementById(id).offsetTop
        wrapDom.scrollTo({
          top: sTop + 120,
          behavior: 'smooth'
        })
      })

      const headers = this.editor.getElemsByTypePrefix('header')
      this.headerList = headers
      this.headerContainer.innerHTML = headers.map(header => {
        const text = SlateNode.string(header)
        const { id, type } = header
        return `<li id="${id}" type="${type}">${text}</li>`
      }).join('')
    },

    onChange(editor) {
      const headers = editor.getElemsByTypePrefix('header')
      this.headerList = headers
      this.headerContainer.innerHTML = headers.map(header => {
        const text = SlateNode.string(header)
        const { id, type } = header
        return `<li id="${id}" type="${type}">${text}</li>`
      }).join('')
    },

    getClickDom(e) {
      const clickDom = e.target
      if (clickDom.tagName === 'IMG') {
        const imgUrl = clickDom.getAttribute('src')
        console.log(imgUrl)
        if (imgUrl) {
          this.previewDialog.visible = true
          this.previewDialog.url = imgUrl
        }
      }
    },
    getHtml() {
      const htmlText = this.editor.getHtml()
      console.log(htmlText)
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="less" scoped>
.docs-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  .wrap-toolbar {
    display: flex;
    justify-content: center;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    background-color: #fff;
  }
  .wrap-container {
    position: relative;
    width: 100%;
    height: calc(100% - 41px);
    padding: 30px 0 150px 0;
    background-color: rgb(245, 245, 245);
    overflow-y: auto;
    .container-editor {
      width: 850px;
      margin: 0 auto;
      padding: 20px 50px 50px 50px;
      background-color: #fff;
      border: 1px solid #e8e8e8;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
      .editor-title {
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #e8e8e8;
        input {
          width: 100%;
          font-size: 30px;
          border: 0;
          outline: none;
          line-height: 1;
        }
      }
      .editor-area {
        width: 100%;
        min-height: 900px;
        // margin-top: 20px;
      }
    }
  }
  .wrap-catalog {
    position: absolute;
    top: 120px;
    right: 30px;
    z-index: 99;
    display: block;
    width: 240px;
    overflow: hidden;
    .catalog-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 34px;
      border-bottom: 1px solid #d4d4d4;
    }
  }
}

// 目录设置
/deep/ #editor-cata {
  width: 100%;
  max-height: calc(100vh - 210px);
  padding: 10px 0;
  list-style-type: none;
  overflow: auto;
  li {
    width: 100%;
    padding: 5px 0;
    color: #999;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      text-decoration: underline;
    }
  }
  li[type="header1"] {
    font-size: 14px;
  }
  li[type="header2"] {
    font-size: 14px;
    padding-left: 15px;
  }
  li[type="header3"] {
    font-size: 14px;
    padding-left: 30px;
  }
  li[type="header4"] {
    font-size: 14px;
    padding-left: 45px;
  }
  li[type="header5"] {
    font-size: 14px;
    padding-left: 60px;
  }
}
</style>
