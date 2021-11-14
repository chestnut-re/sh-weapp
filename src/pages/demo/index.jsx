import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'

import './index.less'

const DemoPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }

  return (
    <View className='SecondPage__root'>
      <Button onClick={toFist}>Swiper Demo</Button>
      <Button color='primary'>主要按钮</Button>
    </View>
  )
}

export default observer(DemoPage)
