/**
 * @description 公共函数
 * @author changz
 * @import import {} from '@/utils/util'
 * */

export function debounce(fn, wait) {
  var timer;
  return function () {
    var _this = this;
    var args = arguments; // 获取debounceCallback传入的参数
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, args); // 把参数传给fn
    }, wait);
    // timer = setTimeout(() => { fn(args) }, wait); // 使用箭头函数就不需要apply
  }
}