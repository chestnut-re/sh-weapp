import Taro from '@tarojs/taro'
import { Provider, userStore, commonStore } from './store/context'
import config from './utils/systemInfo'
import './app.less'

import { clearStorage } from './utils/storage'
import { useEffect } from 'react'

// eslint-disable-next-line import/no-commonjs
const JSONbigString = require('json-bigint')({ storeAsString: true })

Taro.addInterceptor(Taro.interceptors.logInterceptor)

/**
 * 检查登入状态
 */
const loginStateCheck = function (chain) {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then((res) => {
    // console.log('resxxxxx', res)
    if (
      res.data.code === '010011' ||
      res.data.code === '010010' ||
      res.data.code === '010012' ||
      res.data.code === '010014' ||
      res.data.code === '000003'
    ) {
      console.log('accessToken 失效，退出登录并回到首页')
      userStore.loginOut()
    }
    return res
  })
}

/**
 * json
 */
const jsonParse = function (chain) {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then((res) => {
    // console.log('resJSON', res)
    try {
      res.data = JSONbigString.parse(res.data)
    } catch (error) {}
    return res
  })
}

Taro.addInterceptor(loginStateCheck)
Taro.addInterceptor(jsonParse)
Taro.getLaunchOptionsSync()
// console.log(Taro.getLaunchOptionsSync())

const App = ({ children }) => {
  useEffect(() => {
    getSystemInfo()
    onUpdateWeapp()
    Taro.onAppShow((res) => {
      userStore.getWallet()
      console.log('Taro.onAppShow Taro.onAppShow', res)
    })
    Taro.onAppHide((res) => {
      // 隐藏
      commonStore.taskId = null
      commonStore.bizId = null
      commonStore.goodsId = null
    })
  }, [])
  /**
   * 获取设备信息
   */
  const getSystemInfo = () => {
    try {
      let res = Taro.getSystemInfoSync()
      config.pixelRate = res.windowWidth / 750
      config.platform = res.platform
      config.statusBarHeight = res.statusBarHeight
      if (res.platform.toLowerCase() == 'devtools') {
        config.capsuleHeight = 44
      }
      if (res.platform.toLowerCase() == 'android') {
        config.capsuleHeight = 48
      }
      config.titleHeight = (config.capsuleHeight + config.statusBarHeight) / config.pixelRate
      if (res.statusBarHeight >= 44) {
        config.isHighHead = true
      }
      if (res.windowHeight > 750) config.isAllScreen = true
      config.systemHeight = res.windowHeight

      console.log('resresresres', res)
    } catch (e) {
      console.log(e)
    }
  }
  /**
   * 是否需要强制更新
   */
  const onUpdateWeapp = () => {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('请求完新版本信息的回调', res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  }
  return <Provider>{children}</Provider>
}

export default App
