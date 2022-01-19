import { doGetAction, doPostAction, doPutAction, getHeader } from '@/utils/request'
import Taro from '@tarojs/taro'
import { BASE_URL } from '../constants/c'

/**
 * 登录
 */
export class Login {
  tokenHub = new TokenHub()
  // 是否正在调接口刷新token
  tokenRefreshing = false
  constructor() {}
  /**
   * 更新token,并在更新token后重新调用接口
   */
  updateToken = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      console.log('token <--', this.tokenRefreshing)

      if (this.tokenRefreshing) {
        this.tokenHub.addSubscribers(resolve, reject)
        return
      }
      this.tokenRefreshing = true
      // const isSuccess = await this.reLogin()
      // if (isSuccess) {
      //   resolve()
      //   this.tokenHub.notify()
      // } else {
      //   reject(new HttpError(HttpCode.REFRESH_TOKEN_ERROR, ErrorMessage[HttpCode.REFRESH_TOKEN_ERROR]))
      //   this.tokenHub.rejectAll(new HttpError(HttpCode.REFRESH_TOKEN_ERROR, ErrorMessage[HttpCode.REFRESH_TOKEN_ERROR]))
      // }
      this.tokenRefreshing = false
    })
  }
}

class TokenHub {
  subscribers: ((params?: any) => void)[][] = []
  addSubscribers(resolve: (params?: any) => void, reject: (params?: any) => void) {
    this.subscribers.push([resolve, reject])
  }
  notify() {
    this.subscribers.forEach((callbacks) => {
      callbacks?.[0]?.()
    })
    this.subscribers = []
  }
  rejectAll(params: any) {
    this.subscribers.forEach((callbacks) => {
      callbacks?.[1]?.(params)
    })
    this.subscribers = []
  }
}
