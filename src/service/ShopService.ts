import { doGetAction, doPostAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 小店相关
 */

export class ShopService {
  static shopList(data) {
    return doPostAction({ url: `${BASE_URL}/operation/shop/page`, data: data })
  }
}
