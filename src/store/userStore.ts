
import { ACCESS_TOKEN, REFRESH_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/WXService'
import { UserService } from '@/service/UserService'
import { clearStorage, save } from '@/utils/storage'
import Taro, { showToast } from '@tarojs/taro'
import { makeObservable, observable, action } from 'mobx'
import { showMToast } from '@/utils/ui'

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

  async loginIfNeed() {
    if (!this.accessToken) {
      // 需要登录
      await this.login()
    }
  }

  /**登录 */
  async login() {
    const wxRes = await Taro.login()
    console.log(wxRes)
    const openIdRes = await WXService.getOpenId(wxRes.code)

    console.log('res', openIdRes)
    if (openIdRes.data.code == 200) {
      this.accessToken = openIdRes.data.data.accessToken
      this.refreshToken = openIdRes.data.data.refreshToken

      this.openId = openIdRes.data.data.userDetails.openId
      this._isBindMobile = openIdRes.data.data.userDetails.isBindMobile
      this.sessionKey = openIdRes.data.data.userDetails.sessionKey
      save(SESSION_KEY, this.sessionKey!)
      save(ACCESS_TOKEN, this.accessToken!)
      save(REFRESH_TOKEN, this.refreshToken!)
      //获取用户信息 
      const  useInfo = await UserService.getUserInfo()
      console.log('userRes',useInfo)
    } else {
      showMToast(openIdRes.data.msg)
    }
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
