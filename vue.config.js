module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: [.js.vue.css],
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'store': '@/store',
      },
    },
  }
}
