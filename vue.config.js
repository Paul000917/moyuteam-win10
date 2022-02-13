const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 换肤插件
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/moyuteam-win10'
    : '/moyuteam-win10/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: 9091,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hotOnly: false,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/style/globalvar.scss";'
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    name: ' 青训营win10模拟',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@img': resolve('src/assets/image')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      }),
      new ThemeColorReplacer({
        fileName: '/css/theme-colors.[contenthash:8].css',
        matchColors: forElementUI.getElementUISeries('#007aff'),
        changeSelector: forElementUI.changeSelector
      })
    ]
  }
}
