import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import { Swiper } from '@taroify/core'
import TabBar from '../../components/tabbar'
import MineScreen from './components/mine'
import './index.less'

const IndexPage = (props) => {
  const { commonStore } = useStore()
  const swiper = useRef<any>({})
  const [index, setIndex] = useState(0)

  const toDemoPage = () => {
    Taro.navigateTo({ url: '/pages/demo/index' })
  }
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  const onTabClick = (newIndex: number) => {
    console.log(swiper, index, newIndex)
    // swiper.current.next()
    setIndex(newIndex)
    if (index === 0) {
    }
  }

  return (
    <View className='IndexPage__root'>
      <Swiper className='swiper' touchable={false} ref={swiper} duration={0} activeIndex={index}>
        <Swiper.Item>
          <Button onClick={toDemoPage}>跳转到 Demo1</Button>
        </Swiper.Item>
        <Swiper.Item>有味</Swiper.Item>
        <Swiper.Item>
          <MineScreen />
        </Swiper.Item>
      </Swiper>
      <TabBar onClick={onTabClick} />
    </View>
  )
}

export default observer(IndexPage)
