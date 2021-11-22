import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import { Swiper } from '@taroify/core'
import TabBar from '../../components/tabbar'
import MineScreen from './components/mine'
import MsgScreen from './components/msg'
import HomeScreen from './components/home'
import './index.less'

const IndexPage = (props) => {
  const { commonStore } = useStore()
  const swiper = useRef<any>({})
  const [index, setIndex] = useState(0)

  

  const onTabClick = (newIndex: number) => {
    setIndex(newIndex)
  }

  return (
    <View className='IndexPage__root'>
      <Swiper className='swiper' touchable={false} ref={swiper} duration={0} activeIndex={index}>
        <Swiper.Item>
          <HomeScreen />
        </Swiper.Item>
        <Swiper.Item>
          <MsgScreen />
        </Swiper.Item>
        <Swiper.Item>
          <MineScreen />
        </Swiper.Item>
      </Swiper>
      <TabBar onClick={onTabClick} />
    </View>
  )
}

export default observer(IndexPage)
