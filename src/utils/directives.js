/**
 * 自定义指令
 * @author changz
 * */

const directives = {
  install (app) {
    // 自动获取焦点
    app.directive('focus', {
      mounted (el) {
        el.focus()
      }
    })
    // 固定元素
    app.directive('pin', {
      mounted (el, binding) {
        el.style.position = 'fixed'
        // binding.arg 是我们传递给指令的参数 v-pin:[direction]="200"
        const s = binding.arg || 'top'
        el.style[s] = binding.value + 'px'
      }
    })
  }
}

export default directives
