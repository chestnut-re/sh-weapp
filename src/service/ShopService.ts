import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 小店相关
 */

export class ShopService {
  static shopList(current) {
    return doGetAction({
      url: `${BASE_URL}/operation/shop/page`,
      data: {
        current,
        size: 10,
      },
    })
  }

  static attention(data) {
    return doPostAction({ url: `${BASE_URL}/operation/shop/attention`, data })
  }
}
