import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 首页相关
 */
 export class HomeService {
  /// 专题活动列表
  static getActivity() {
    return doGetAction({ url: `${BASE_URL}/operation/activity/list`, data: { } })
  }

   ///商品列表
   static getGoods (goodsDetailUrl: string, goodsName: string, price: string, sales: string, likes: string, goodsId: string) {
     return doGetAction({
       url: `${BASE_URL}/operation/home/goods/list`, data: {
        goodsDetailUrl,goodsName, price,sales,likes,goodsId
   } })
  }
   
   ///商品列表
   static getBanner () {
    return doGetAction({url: `${BASE_URL}/operation/banner/list`, data: {} })
 }
}