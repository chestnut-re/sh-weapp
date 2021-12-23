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
  static getGoodsPage() {
    return doGetAction({
      url: `${BASE_URL}/operation/goods/page`,
      data: {},
    })
  }
  ///搜索商品列表
  static searchGoodsPage({ keyword }: any) {
    return doGetAction({
      url: `${BASE_URL}/operation/goods/page`,
      data: {
        keyword: keyword,
      },
    })
  }
  ///轮播图
  static getBanner() {
    return doGetAction({ url: `${BASE_URL}/operation/banner/list`, data: {} })
  }
}
