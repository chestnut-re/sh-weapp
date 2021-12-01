import { ACCESS_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/wx'
import { save } from '@/utils/storage'
import Taro, { showToast } from '@tarojs/taro'
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
  isBindMobile = null
  sessionKey = null
  /** user token */
  accessToken = null
  /** user refresh token 刷新 token 用*/
  refreshToken = null

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      login: action,
      loginOut: action,
      init: action,
    })
    this.init()
  }

  /// 初始化
  init() {
    console.log('wx user init')
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
        this.isBindMobile = res.data.data.userDetails.isBindMobile
        this.sessionKey = res.data.data.userDetails.sessionKey
        save(SESSION_KEY, this.sessionKey!)
        save(ACCESS_TOKEN, this.accessToken!)
      })
    })
  }

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
        this.isBindMobile = res.data.data.userDetails.isBindMobile
        this.sessionKey = res.data.data.userDetails.sessionKey

        console.log('login:', this.accessToken)
      })
    })
  }

  loginOut() {}

  /**是否已经登录 */
  get isLogin() {
    return this.accessToken!!
  }
}

function createUserStore() {
  return new UserData()
}

export { createUserStore }
