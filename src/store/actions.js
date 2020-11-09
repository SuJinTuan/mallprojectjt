

import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export default {

  ADD_CART(context, payload) {
    // payload新添加的商品
    // 数组常用的方法有哪些？indexof\push\pop\unshit\sort\reverse\map\reduce\filter\join
    // 第一种
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 第二种：
    // let index =state.cartList.indexOf(payload)
    // state.cartList[index]//不等于-1的时候说明有
    // 第三种：

    return new Promise((resolve, reject) => {
      // 1.查找之前数中是否有该商品
      let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
      // console.log(oldproduct);
      // // 2.判断oldProduct
      if (oldproduct) {
        // oldproduct.count += 1;
        context.commit(ADD_COUNTER, oldproduct)
        resolve('当前的商品数量+1')
      } else {//添加新的商品
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload)
        resolve('当前添加新的商品')
      }
    })
  }

}
