import Taro from '@tarojs/taro'
import { View, Text, Button, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import {} from '@taroify/core'

import { observer } from 'mobx-react'
import token from '@/assets/img/token/22token.png'
import './index.less'
/**
 * 我的代币
 */
const MyTokenPage = () => {
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
      <View className='header'>
        <View>
          <Text>340000</Text>
          <Image className='img' src={token} />
        </View>
        <View>提现</View>
      </View>
      <View className='card'>
        <View>边玩边省 开心玩 实在省</View>
        <View>购买实在省线路并确认订单，可解锁享礼权益完成权益对应任务，可将所获好礼直接提现或购物抵现</View>
      </View>
      <Button onClick={toFist}>Swiper Demo</Button>
      <Button onClick={toLogin}>Go to Login</Button>
    </View>
  )
}

export default observer(MyTokenPage)
