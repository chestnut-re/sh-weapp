import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'

import './index.less'

const MyTokenPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  return (
    <View className='MyTokenPage__root'>
      <Button onClick={toFist}>Swiper Demo</Button>
      <Button onClick={toLogin}>Go to Login</Button>
      <Button color='primary'>主要按钮</Button>
    </View>
  )
}

export default observer(MyTokenPage)
