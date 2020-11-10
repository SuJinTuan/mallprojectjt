module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      // viewportWidth: 375,//视窗的宽度，对应的是我们设计稿的宽度
      // viewportheight: 667,//视窗的高度，对应的是我们设计稿的高度(也可以不配置)
      // unitPrecision: 5,//制定’px'转换为视窗单位值的小数位数(很多时候无法整除)
      // viewportUnit: 'vm',//知道需要换成的视窗单位，建议使用VM
      // selectorBlackList: ['ignore', 'bottom-bar', 'tab-control', 'back-top', 'nav-bar', 'tab-bar', 'tab-bar-item', 'recommend', 'wrapper', 'content'],//制定不用转换的类
      // minPixelValue: 1,//小于或等于’1px'不转换为视图单位
      // mediaQuery: false,//允许媒体查询中转换‘px;
      // exclude: [/TabBar.vue$/]
    }
  }
}
// 在js中
// 使用正则：/正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.安装排除的文件写对应的正则：
// 正则的规则：
// 1 >^ abc: 标识匹配的内容，必须以什么内容开头（abc开头)
// 2 > abc$: 标识匹配的内容，必须以什么内容结尾（abc结尾)
