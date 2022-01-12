import { doGetAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 消息相关
 */

export class MsgService {
  /// 获取系统消息或订单消息
  static getMsg(id) {
    return doGetAction({
      url: `${BASE_URL}/users/message/list/${id}`,
      data: {},
    })
  }
}
