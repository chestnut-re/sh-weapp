import { ACCESS_TOKEN, CITY_INFO, REFRESH_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/WXService'
import { UserService } from '@/service/UserService'
import { clearStorage, get, save } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { makeObservable, observable, action } from 'mobx'
import { showMToast } from '@/utils/ui'
import { getSuggestCity } from '@/utils/location'

/**
 * 用户相关数据
 * 登录/注册
 * 用户基本信息
 * 城市信息维护
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
  /**city 城市信息，需要保存到本地 */
  city = null

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      city: observable,
      init: action,
      login: action,
      loginOut: action,
      setCityCode: action,
      initCity: action,
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
    const openIdRes = await WXService.getOpenId(wxRes.code)

    if (openIdRes.data.code == 200) {
      this.accessToken = openIdRes.data.data.accessToken
      this.refreshToken = openIdRes.data.data.refreshToken

      this.openId = openIdRes.data.data.userDetails.openId
      this._isBindMobile = openIdRes.data.data.userDetails.isBindMobile
      this.sessionKey = openIdRes.data.data.userDetails.sessionKey
      save(SESSION_KEY, this.sessionKey!)
      save(ACCESS_TOKEN, this.accessToken!)
      save(REFRESH_TOKEN, this.refreshToken!)
      this.getUserInfo()
    } else {
      showMToast(openIdRes.data.msg)
    }
  }

  //获取用户信息
  async getUserInfo() {
    const useInfo = await UserService.getUserInfo()
    console.log('userRes', useInfo)
    if (useInfo.data.code == 200) {
      this.userInfo = useInfo.data.data
    } else {
      showMToast(useInfo.data.msg)
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

  /**初始化城市信息 */
  async initCity() {
    const res = await get(CITY_INFO)
    if (res) {
      this.setCityCode(JSON.parse(res.data))
    } else {
      const suggestCity = await getSuggestCity()
      this.setCityCode(suggestCity)
    }
  }

  /**设置城市信息 */
  setCityCode(city: any) {
    if (!city) return
    this.city = city
    save(CITY_INFO, JSON.stringify(city))
    console.log('设置城市', city)
  }
}

function createUserStore() {
  return new UserData()
}

export { createUserStore }
