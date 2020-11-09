module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportheight: 667,//视窗的高度，对应的是我们设计稿的高度(也可以不配置)
      unitPrecision: 5,//制定’px'转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vm',//知道需要换成的视窗单位，建议使用VM
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],//制定不用转换
      minPixelValue: 1,//小于或等于’1px'不转换为视图单位
      mediaQuery: false//允许媒体查询中转换‘px;
    }
  }
}
