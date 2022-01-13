import { doPutAction } from './../utils/request'
import { doGetAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 消息相关
 */

export class MsgService {
  /// 获取系统消息或订单消息
  static getMsg(id, current) {
    return doGetAction({
      url: `${BASE_URL}/users/message/list`,
      data: {
        current,
        type: id,
        size: 10,
      },
    })
  }
  /// 未读消息
  static getUnread() {
    return doGetAction({
      url: `${BASE_URL}/users/message/unreadCount`,
      data: {},
    })
  }
  /// 全部已读消息
  static readAll(type) {
    return doPutAction({
      url: `${BASE_URL}/users/message/readAll?type=${type}`,
      data: {},
    })
  }
  /// 全部已读消息
  static read(id) {
    return doPutAction({
      url: `${BASE_URL}/users/message/read?messageId=${id}`,
      data: {},
    })
  }
}
