import { View } from '@tarojs/components'
import { observer } from 'mobx-react'

import './index.less'

/**
 * 消息
 */
const MsgScreen = () => {
  return (
    <View className='MsgScreen__root'>
      <View>消息界面</View>
    </View>
  )
}

export default observer(MsgScreen)
