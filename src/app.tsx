import Taro from '@tarojs/taro'
import { Provider, userStore } from './store/context'

import './app.less'
import { clearStorage } from './utils/storage'

Taro.addInterceptor(Taro.interceptors.logInterceptor)

/**
 * 检查登入状态
 */
const loginStateCheck = function (chain) {
  const requestParams = chain.requestParams

  return chain.proceed(requestParams).then((res) => {
    if (res.data.code === '010011') {
      console.log('accessToken 失效，退出登录并回到首页');
      userStore.loginOut()
    }
    return res
  })
}
Taro.addInterceptor(loginStateCheck)

const App = ({ children }) => {
  return <Provider>{children}</Provider>
}

export default App
