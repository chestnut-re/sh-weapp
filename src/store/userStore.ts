import { ACCESS_TOKEN, REFRESH_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/wx'
import { clearStorage, save } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { makeObservable, observable, action } from 'mobx'

/**
 * 用户相关数据
 * 登录/注册
 * 用户基本信息
 */
class UserData {
  /**用户信息 */
  userInfo = null
  openId = null
  /**isBindMobile: 是否已经绑定手机号，0未绑定，1已绑定 */
  _isBindMobile = null
  sessionKey = null
  /** user token */
  accessToken = null
  /** user refresh token 刷新 token 用*/
  refreshToken = null

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      init: action,
      login: action,
      loginOut: action,
    })
    this.init()
  }

  /// 初始化
  init() {
    console.log('wx user init')
    this.login()
  }

  /**登录 */
  login() {
    Taro.login().then((wxRes) => {
      console.log(wxRes)
      WXService.getOpenId(wxRes.code).then((res) => {
        console.log(res)
        // if(res.data.code == 200){
        // }else{
        // }
        this.accessToken = res.data.data.accessToken
        this.refreshToken = res.data.data.refreshToken

        this.openId = res.data.data.userDetails.openId
        this._isBindMobile = res.data.data.userDetails.isBindMobile
        this.sessionKey = res.data.data.userDetails.sessionKey
        save(SESSION_KEY, this.sessionKey!)
        save(ACCESS_TOKEN, this.accessToken!)
        save(REFRESH_TOKEN, this.refreshToken!)
      })
    })
  }

  /**退出登录 */
  loginOut() {
    this.accessToken = null
    this.refreshToken = null
    this.openId = null
    this._isBindMobile = null
    this.sessionKey = null
    clearStorage()
    // 回到首页
    Taro.reLaunch({
      url: '/pages/index/index',
    })
  }

  /**true: 表示已经绑定，用这个判断是否已经登录 */
  get isBindMobile() {
    return this._isBindMobile === 1
  }
}

function createUserStore() {
  return new UserData()
}

export { createUserStore }
