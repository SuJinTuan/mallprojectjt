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
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
