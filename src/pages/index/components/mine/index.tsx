import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { BullhornOutlined, SettingOutlined, Scan, Manager, InfoOutlined, Points } from '@taroify/icons'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'

const MineScreen = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  const toMyOrder = () => {
    Taro.navigateTo({ url: '/pages/myOrder/index' })
  }

  const toMyToken = () => {
    Taro.navigateTo({ url: '/pages/myToken/index' })
  }
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  return (
    <View className='MineScreen__root'>
      <View className='Header__btn'>
        <View className='btn' onClick={toFist}>
          <Image className='img' src={pic} />
        </View>
        <View className='btn' onClick={toLogin}>
          <Image className='img' src={pic} />
        </View>
        <View className='btn' onClick={toSetUp}>
          <Image className='img' src={pic} />
        </View>
      </View>
      <View className='user' onClick={toMyData}>
        <View className='User__Img'>
          <Image className='img' src={pic} />
        </View>
        <View className='User__Name'>
          <Text className='name'>丛林迷雾</Text>
          <Text className='autograph'>天空分外晴朗,白云也绽露笑容</Text>
        </View>
      </View>
      <View className='dolor'>
        <View className='details'>
          <Image className='img' src={pic} />
        </View>
        <View className='token'>
          <View className='Token__Img'>
            <Image className='img' src={pic} />
          </View>
          <Text className='Token__Num'>2800</Text>
        </View>
      </View>
      <View className='card'>
        <View className='Card__Item'>浏览</View>
        <View className='Card__Item'>点赞</View>
      </View>
      <Button onClick={toLogin}>login</Button>
      <Button onClick={toMyOrder}>我的订单</Button>
      <Button onClick={toMyToken}>我的代币</Button>
    </View>
  )
}

export default observer(MineScreen)
