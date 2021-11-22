import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Image } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { observer } from 'mobx-react'

import './index.less'

/**
 * 设置页
 */
const SetUpPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toAboutUs = () => {
    Taro.navigateTo({ url: '/pages/aboutUs/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  return (
    <View className='SetUpPage__root'>
      <View className='user' onClick={toMyData}>
        <Image className='img'></Image>
        <View className='massage'>
          <View className='name'>丛林迷雾</View>
          <View className='autograph'>签名： 天空分外晴朗，白云也绽放笑容</View>
          <View className='address'>常住地： 北京市海淀区</View>
        </View>
      </View>
      <View className='password'>
        <View className='password-left'>登陆密码</View>
        <View className='password-right'>
          去设置
          <View className='password-left'>
            <Arrow />
          </View>
        </View>
      </View>
      <View className='content-list'>
        <View className='content'>
          <View className='content-left'>意见反馈</View>
          <View className='content-right'>
            来告诉我们你的想法吧
            <View className='content-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='content'>
          <View className='content-left'>清除缓存</View>
          <View className='content-right'>
            <View className='content-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='content' onClick={toAboutUs}>
          <View className='content-left'>关于我们</View>
          <View className='content-right'>
            <View className='content-left'>
              <Arrow />
            </View>
          </View>
        </View>
      </View>
      <Button className='btn' onClick={toFist}>
        退出当前账号
      </Button>
      {/* <Button onClick={toLogin}>Go to Login</Button> */}
      {/* <Button color='primary'>主要按钮</Button> */}
    </View>
  )
}

export default observer(SetUpPage)