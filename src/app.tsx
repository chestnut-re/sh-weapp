import Taro from '@tarojs/taro'
import { Provider, userStore } from './store/context'
import './app.less'

import { clearStorage } from './utils/storage'
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
    } catch (error) { }
    return res
  })
}

Taro.addInterceptor(loginStateCheck)
Taro.addInterceptor(jsonParse)
Taro.getLaunchOptionsSync()
// console.log(Taro.getLaunchOptionsSync())


const App = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default App
