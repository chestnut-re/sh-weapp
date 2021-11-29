import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { BullhornOutlined, SettingOutlined, Scan, Manager, InfoOutlined, Points } from '@taroify/icons'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import lingdang from '@/assets/img/mine/lingdang.png'
import saoyisao from '@/assets/img/mine/saoyisao.png'
import shezhi from '@/assets/img/mine/shezhi.png'
import myPhoto from '@/assets/img/mine/myphoto.png'
import jifen from '@/assets/img/mine/jifen.png'
import tishi from '@/assets/img/mine/tishi.png'
import liulan from '@/assets/img/mine/liulan.png'
import good from '@/assets/img/mine/good.png'
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
          <Image className='img' src={lingdang} />
        </View>
        <View className='btn' onClick={toLogin}>
          <Image className='img' src={saoyisao} />
        </View>
        <View className='btn' onClick={toSetUp}>
          <Image className='img' src={shezhi} />
        </View>
      </View>
      <View className='user' onClick={toMyData}>
        <View className='User__Img'>
          <Image className='img' src={myPhoto} />
        </View>
        <View className='User__Name'>
          <Text className='name'>丛林迷雾</Text>
          <Text className='autograph'>天空分外晴朗,白云也绽露笑容</Text>
        </View>
      </View>
      <View className='dolor'>
        <View className='details'>
          <Image className='img' src={tishi} />
        </View>
        <View className='token'>
          <View className='Token__Img'>
            <Image className='img' src={jifen} />
          </View>
          <Text className='Token__Num'>2800</Text>
        </View>
      </View>
      <View className='card'>
        <View className='Card__Item Card__Left'>
          <Image className='img' src={liulan} />
          <View>
            <View className='num'>125</View>
            <View className='text'>浏览</View>
          </View>
        </View>
        <View className='Card__Item'>
          <Image className='img' src={good} />
          <View>
            <View className='num'>265</View>
            <View className='text'>点赞</View>
          </View>
        </View>
      </View>
      <View className='use-list'>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>游记地图</View>
        </View>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>邀请好友</View>
        </View>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>学生认证</View>
        </View>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>优惠券</View>
        </View>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>常用信息</View>
        </View>
        <View className='item'>
          <Image className='img' src={jifen} />
          <View className='item-text'>专属客服</View>
        </View>
      </View>
      <Button onClick={toLogin}>login</Button>
      <Button onClick={toMyOrder}>我的订单</Button>
      <Button onClick={toMyToken}>我的代币</Button>
    </View>
  )
}

export default observer(MineScreen)
