import Taro from '@tarojs/taro'
import { Component, useEffect } from 'react'
import { Provider, userStore } from './store/context'

import './app.less'

Taro.addInterceptor(Taro.interceptors.logInterceptor)

// /**
//  * 检查登入状态
//  */
//  const loginStateCheck = function (chain) {
//   const requestParams = chain.requestParams

//   return chain.proceed(requestParams).then((res) => {
//     if (res.data.status == 401) {
//       clearStorage().then(() => {
//         userStore.clearData()
//         // 认证信息失效
//         Taro.reLaunch({
//           url: '/pages/auth/index',
//         })
//       })
//     }
//     return res
//   })
// }
// Taro.addInterceptor(loginStateCheck)

const App = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default App
