import { doPostAction } from './../utils/request'
import { doGetAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 订单相关
 */

export class MyOrderService {
  /// 获取订单列表
  static orderQuery() {
    return doGetAction({
      url: `${BASE_URL}/orders/query`,
      data: {},
    })
  }
  /// 下拉刷新
  static orderQueryUp(current) {
    return doGetAction({
      url: `${BASE_URL}/orders/query`,
      data: {
        current,
        size: 10,
      },
    })
  }
  /// 获取订单数量
  static querySortOrderCount() {
    return doPostAction({
      url: `${BASE_URL}/orders/querySortOrderCount`,
      data: {},
    })
  }
}
