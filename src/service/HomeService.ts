import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 首页相关
 */
export class HomeService {
  /// 专题活动列表
  static getActivity() {
    return doGetAction({ url: `${BASE_URL}/operation/activity/list`, data: {} })
  }

  ///商品列表
  static getGoodsPage(current) {
    return doGetAction({
      url: `${BASE_URL}/operation/goods/page`,
      data: {
        current,
        size: 10,
      },
    })
  }

  ///搜索商品列表
  static searchGoodsPage({ keyword, current }: any) {
    return doGetAction({
      url: `${BASE_URL}/operation/goods/page`,
      data: {
        keyword: keyword,
        size: 10,
        current,
      },
    })
  }
  ///轮播图
  static getBanner() {
    return doGetAction({ url: `${BASE_URL}/operation/banner/list`, data: {} })
  }
}
