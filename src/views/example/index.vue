<template>
  <div class="index">
    <a-tabs>
      <a-tab-pane key="1" tab="轮播图">
        <SwiperExample></SwiperExample>
      </a-tab-pane>
      <a-tab-pane key="2" tab="代码编辑器">
        <CodeEditor></CodeEditor>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
/**
 * @description 示例
 * @author changz
 * */

import SwiperExample from './components/SwiperExample'
import CodeEditor from './components/CodeEditor'
export default {
  name: 'Example',
  components: {
    SwiperExample,
    CodeEditor
  }
}
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  background-color: #fff;
}
</style>