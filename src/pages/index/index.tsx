import { View } from '@tarojs/components'
import { observer } from 'mobx-react'
import { useState } from 'react'
import TabBar from '../../components/tabbar'
import MineScreen from './components/mine'
import MsgScreen from './components/msg'
import HomeScreen from './components/home'
import './index.less'

const IndexPage = () => {
  const [index, setIndex] = useState(0)

  const onTabClick = (newIndex: number) => {
    // if ((newIndex == 1 || newIndex == 2) && !userStore.isBindMobile) {
    //   console.log(userStore.isBindMobile)
    //   // 未登录
    //   Taro.navigateTo({ url: '/pages/login/index' })
    //   return
    // }
    setIndex(newIndex)
  }

  return (
    <View className='IndexPage__root'>
      <View style={index == 0 ? { display: 'block ' } : { display: 'none' }}>
        <HomeScreen />
      </View>
      <View style={index == 1 ? { display: 'block ' } : { display: 'none' }}>
        <MsgScreen />
      </View>
      <View style={index == 2 ? { display: 'block ' } : { display: 'none' }}>
        <MineScreen />
      </View>
      <TabBar onClick={onTabClick} value={index} />
    </View>
  )
}

export default observer(IndexPage)
