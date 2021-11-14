import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'

import './index.less'

const IndexPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }

  const toDemoPage = () => {
    Taro.navigateTo({ url: '/pages/demo/index' })
  }

  return (
    <View className='SecondPage__root'>
      <Text>Home</Text>
      <Text>{commonStore.counter}</Text>
      <Button onClick={toDemoPage}>跳转到 Demo</Button>
    </View>
  )
}

export default observer(IndexPage)
