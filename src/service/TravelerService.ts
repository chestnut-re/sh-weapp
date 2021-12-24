import { doGetAction, doPostAction, doPutAction, getHeader } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 出行人相关
 */

export class TravelerService {
  /// 获取出行人列表
  static getTravelerList() {
    return doGetAction({ url: `${BASE_URL}/users/customer/traveler/list`, data: {} })
  }

  ///删除出行人
}
