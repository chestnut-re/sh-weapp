import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'

import './index.less'

/**
 * 首页
 */
const HomeScreen = (props) => {
  const { commonStore } = useStore()
  const toDemoPage = () => {
    Taro.navigateTo({ url: '/pages/demo/index' })
  }

  const toWebViewPage = () => {
    const url = decodeURIComponent('http://123.56.248.148/protocol/privacy')
    Taro.navigateTo({ url: `/pages/webview/index?url=${url}` })
  }
  
  return (
    <View className='HomeScreen__root'>
      home
      <Button onClick={toDemoPage}>跳转到 Demo1</Button>
      <Button onClick={toWebViewPage}>跳转到 WebView</Button>
      <Button
        onClick={() => {
          Taro.scanCode({}).then((res) => {
            console.log(res)
          })
        }}
      >
        扫码
      </Button>
    </View>
  )
}

export default observer(HomeScreen)
