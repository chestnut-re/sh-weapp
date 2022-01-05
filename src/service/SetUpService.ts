import { doGetAction, doPostAction, doPutAction, getHeader } from '@/utils/request'
import { transImg } from '@/utils/upload'
import Taro from '@tarojs/taro'
import { BASE_URL } from '../constants/c'

/**
 * 设置相关
 */
export class SetUpService {
  /// 设置密码
  static editSetPwd({}) {
    return doPutAction({ url: `${BASE_URL}/users/setPwd`, data: {} })
  }

  ///获取验证码
  static sendValidCode(phone: string) {
    return doPostAction({
      url: `${BASE_URL}/users/getValidCode`,
      data: {
        phone: phone,
        validType: '1',
        loginChannel: '2',
      },
    })
  }
  ///获取验证码
  static checkValidCode(phone: string, validCode: string) {
    return doPostAction({
      url: `${BASE_URL}/users/checkValidCode`,
      data: {
        phone: phone,
        validType: '1',
        validCode: validCode,
      },
    })
  }
  ///意见反馈
  static feedback(data) {
    return doPostAction({
      url: `${BASE_URL}/multi/feedback/save`,
      data: data,
    })
  }
}
