

import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types"

export default {

  ADD_CART(context, payload) {
    // payload新添加的商品
    // 数组常用的方法有哪些？indexof\push\pop\unshit\sort\reverse\map\reduce\filter\join
    // 第一种
    // let oldProduct = null;
    // for (let item of state.castList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 第二种：
    // let index =state.castList.indexOf(payload)
    // state.castList[index]//不等于-1的时候说明有
    // 第三种：

    // 查找之前数中是否有该商品

    let oldproduct = context.state.castList.find(item => {
      // console.log(item + 'item');
      return item.iid === payload.iid
    })
    // console.log(oldproduct);
    // // 2.判断oldProduct
    if (oldproduct) {
      // oldproduct.count += 1;
      context.commit(ADD_COUNTER, oldproduct)
    } else {
      payload.count = 1;
      // context.state.castList.push(payload);
      context.commit(ADD_TO_CART, payload)
    }
  }

}
