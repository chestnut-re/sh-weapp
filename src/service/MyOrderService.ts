import { doGetAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 订单相关
 */

export class MyOrderService {
  /// 获取出行人列表
  static orderQuery() {
    return doGetAction({ url: `${BASE_URL}/orders/query`, data: {} })
  }
}
