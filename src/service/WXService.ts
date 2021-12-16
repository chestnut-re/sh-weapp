import { doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 微信相关
 */
export class WXService {
  /// 获取 openid，accessToken，
  static getOpenId(code: string) {
    return doPostAction({ url: `${BASE_URL}/users/login/mini`, data: { code } })
  }

  /// 绑定手机号
  static bindMobile(encryptedData: string, iv: string, sessionKey: string) {
    return doPutAction({
      url: `${BASE_URL}/users/bindMobile`,
      data: {
        encryptedData,
        iv,
        sessionKey,
      },
    })
  }
}
