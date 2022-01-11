import { doGetAction, doPostAction, doPutAction, getHeader } from '@/utils/request'
import Taro from '@tarojs/taro'
import { BASE_URL } from '../constants/c'

/**
 * 浏览点赞
 */
export class LikeService {
  ///点赞
  static like(data) {
    return doPostAction({ url: `${BASE_URL}/operation/goodsLikeView/like`, data })
  }
  /// 浏览点赞记录列表
  static likeList(data) {
    return doGetAction({ url: `${BASE_URL}/operation/goodsLikeView/page`, data })
  }

  /// 点赞浏览总数

  static likeCount(data) {
    return doGetAction({ url: `${BASE_URL}/operation/goodsLikeView/pageTypeCount`, data })
  }
}
