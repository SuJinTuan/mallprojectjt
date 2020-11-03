import { request } from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page,
    },
  })
}



// 函数带哦用->压入函数栈中(保存函数调用过程中所有变量)
// 函数调用结束 ->弹出函数栈
// function test() {
// const names = ['why', 'aaa'];
// }
// test()
// 内存会自动回收，在调用函数会重新调用，调用完，又会被内存回收掉！
