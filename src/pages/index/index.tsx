import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import { Swiper } from '@taroify/core'
import TabBar from '../../components/tabbar'
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
  const tomyorder = () => {
    Taro.navigateTo({ url: '/pages/myOrder/index' })
  }

  const tomytoken = () => {
    Taro.navigateTo({ url: '/pages/myToken/index' })
  }
  const onTabClick = (newIndex: number) => {
    console.log(swiper)
    // swiper.current.next()
    setIndex(newIndex)
  }

  return (
    <View className='IndexPage__root'>
      <Swiper className='swiper' touchable={false} ref={swiper} duration={0} activeIndex={index}>
        <Swiper.Item>
          <Button onClick={toDemoPage}>跳转到 Demo</Button>
        </Swiper.Item>
        <Swiper.Item>有味</Swiper.Item>
        <Swiper.Item>
          我的
          <Button onClick={toLogin}>login</Button>
          <Button onClick={tomyorder}>我的订单</Button>
          <Button onClick={tomytoken}>我的代币</Button>
        </Swiper.Item>
      </Swiper>
      <TabBar onClick={onTabClick} />
    </View>
  )
}

export default observer(IndexPage)
