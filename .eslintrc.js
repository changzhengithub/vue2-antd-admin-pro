module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'vue/multi-word-component-names': ['off'], // 是否强制组件名称多单词
    'camelcase': 'off', // 是否强制使用驼峰拼写法命名规定
    'space-before-function-paren': 'off', // 是否强制方法圆括号左边空格
    'no-multiple-empty-lines': 'off', // 不允许多个空行
    'new-cap': 'off', // 构造函数名首字母大写
    'eol-last': 'off', // 要求或禁止文件末尾存在空行
    'dot-notation': 'off', // 允许不使用点表示写法
    'vue/no-mutating-props': ['off'], // 关闭Vue不能修改props警告
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
