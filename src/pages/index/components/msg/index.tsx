import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'

import './index.less'

/**
 * 消息
 */
const MsgScreen = (props) => {
  const { commonStore } = useStore()

  return <View className='MsgScreen__root'>home</View>
}

export default observer(MsgScreen)
