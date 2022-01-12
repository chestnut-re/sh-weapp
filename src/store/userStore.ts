import { ACCESS_TOKEN, CITY_INFO, REFRESH_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/WXService'
import { UserService } from '@/service/UserService'
import { LocationService } from '@/service/LocationService'
import { clearStorage, get, save } from '@/utils/storage'
import Taro from '@tarojs/taro'
import { makeObservable, observable, action } from 'mobx'
import { hideLoading, showLoading, showMToast } from '@/utils/ui'
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
  phoneNumber = null
  /**isBindMobile: 是否已经绑定手机号，0未绑定，1已绑定 */
  _isBindMobile = null
  sessionKey = null
  /** user token */
  accessToken = null
  /** user refresh token 刷新 token 用*/
  refreshToken = null
  /**city 城市信息，需要保存到本地 */
  city = null
  cityInfo = null
  /** totalAmount 代币信息*/
  totalAmount = null
  constructor() {
    makeObservable(this, {
      totalAmount: observable,
      userInfo: observable,
      city: observable,
      _isBindMobile: observable,
      init: action,
      login: action,
      loginOut: action,
      setCityCode: action,
      initCity: action,
    })
    // this.init()
  }

  /// 初始化
  async init(callback) {
    console.log('wx user init')
    await this.login()
    callback()
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
      this.phoneNumber = openIdRes.data.data.userDetails.phoneNumber
      save(SESSION_KEY, this.sessionKey!)
      save(ACCESS_TOKEN, this.accessToken!)
      save(REFRESH_TOKEN, this.refreshToken!)
      this.getUserInfo()
      this.getAreaList()
      this.getWallet()
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
  //获取常住地城市列表
  async getAreaList() {
    const cityInfo = await LocationService.getAreaList()
    if (cityInfo.data.code == 200) {
      this.cityInfo = cityInfo.data.data
    } else {
      showMToast(cityInfo.data.msg)
    }
  }
  //获取我的代币
  async getWallet() {
    const wallet = await UserService.getUserWallet()
    if (wallet.data.code == 200) {
      this.totalAmount = wallet.data.data.totalAmount
    } else {
      showMToast(wallet.data.msg)
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
    Taro.switchTab({
      url: '/pages/home/index',
    })
  }

  /**true: 表示已经绑定，用这个判断是否已经登录 */
  get isBindMobile() {
    return this._isBindMobile === 1
  }

  /**初始化城市信息 */
  async initCity(force = false) {
    let res
    try {
      res = await get(CITY_INFO)
    } catch (error) {
      console.log('error', error)
    }
    if (res && !force) {
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
