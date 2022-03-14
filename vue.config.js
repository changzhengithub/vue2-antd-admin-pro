const path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 本地服务配置
  devServer: {
    // disableHostCheck: true
    // host: 'xxx.xxx.xxx.xx', // 本机地址
    // port: 8080, // 端口号
    // https: false, // https:{type:Boolean}
    // open: true, //配置自动启动浏览器
    // proxy: {
    //     '/api': {
    //         target: 'http://www.xxx.com/api', // 跨域地址
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // }
  },

  // 全局配置less
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
          globalVars: {
            // less vars，customize ant design theme
            // 'primary-color': '#F5222D',
          }
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/less/main.less')]
    }
  }

})
