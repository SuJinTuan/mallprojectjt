import { request } from "./request"

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}




// 面向对象的封装：将服务器返回的数据将其封装到一个类里面在然后创建类对应的对象；
// 用对象给我们把这些信息传到下一层组件里面；让组件对这个东西做一个展示
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;

  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注意：images可能没有值：有些有，有些没有
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}




















// const g = new GoodsInfo();
// g.title
// g.desc

// class Person {//构造函数--
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const p = new Person('sjt',18)
// 如何判断一个对象是一个空对像？
// const obj = {

// }
// Object.keys(obj).length===0则说明是一个空对象
