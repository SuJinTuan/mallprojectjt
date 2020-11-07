export function debounce(func, delay) {
  // setTimeout(()=>{
  //   setTimeout里面的函数是异步函数，
  //   这个异步函数是在下一次事件在循环的时候;
  //   所以这个函数永远不会放在最后执行;
  //   所以这里的箭头()=>{}函数是永远是最后执行。
  //   这里会涉及到浏览器的事件循环
  // })
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // func.apply(this, args);
      func(...args);
    }, delay);
  };
}

// 正则表达式：用于字符串匹配
//
export function formatDate(date, fmt) {
  // 1.获取年份
  // y+ 1个或者多个y
  // y? 0个或者1个y
  // y* 0个获取多个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2，获取
  // M+正在表达式中的一个规则
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 05：05：05
function padLeftZero(str) {
  // 补齐两位
  return ('00' + str).substr(str.length);
};
