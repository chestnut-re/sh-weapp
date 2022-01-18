import { token } from '@/assets/img/token/22token.png'
import { ACCESS_TOKEN, CITY_INFO, REFRESH_TOKEN, SESSION_KEY } from '@/constants/c'
import { WXService } from '@/service/WXService'
import { UserService } from '@/service/UserService'
import { LocationService } from '@/service/LocationService'
import { LikeService } from '@/service/Like'
import { clearStorage, get, save, remove } from '@/utils/storage'
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
  /** likeNum 点赞数量 */
  likeNum = null
  /** browseNum 浏览数量 */
  browseNum = null

  tokenRefreshing = false
  subscribers: ((params?: any) => void)[][] = []

  constructor() {
    makeObservable(this, {
      totalAmount: observable,
      userInfo: observable,
      city: observable,
      _isBindMobile: observable,
      likeNum: observable,
      browseNum: observable,
      init: action,
      login: action,
      loginOut: action,
      setCityCode: action,
      initCity: action,
      likeCount: action,
    })
    // this.init()
    this.getToken()
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
  getToken() {
    try {
      const value = Taro.getStorageSync(ACCESS_TOKEN)
      if (value) {
        this.accessToken = value
      }
    } catch (e) {
      // Do something when catch error
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
      this.getMineInfo()
    } else {
      showMToast(openIdRes.data.msg)
    }
  }

  getMineInfo() {
    this.getUserInfo()
    this.getAreaList()
    this.getWallet()
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
    this.userInfo = null

    remove(SESSION_KEY)
    remove(ACCESS_TOKEN)
    remove(REFRESH_TOKEN)
    clearStorage()
    // 回到首页
    Taro.switchTab({
      url: '/pages/home/index',
    })
  }

  /**true: 表示已经绑定，用这个判断是否已经登录 */
  get isBindMobile() {
    return this.accessToken && true
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

  /** 点赞浏览数量 */
  async likeCount() {
    const {
      data: { data },
    } = await LikeService.likeCount()
    this.likeNum = data.likeCountNum
    /** browseNum 浏览数量 */
    this.browseNum = data.browseCountNum
    console.log('datadata', data)
  }

  /**
   * 更新token,并在更新token后重新调用接口
   */
  updateToken = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      if (this.tokenRefreshing) {
        this.addSubscribers(resolve, reject)
        return
      }
      this.tokenRefreshing = true
      await this.login()
      resolve()
      this.notify()
      this.tokenRefreshing = false
    })
  }

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

function createUserStore() {
  return new UserData()
}

export { createUserStore }
