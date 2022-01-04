/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import { H5 } from '@/constants/h5'
import jump from '@/assets/img/yjfk/jump.png'
import './index.less'

const AboutUsPage = () => {
  const { commonStore } = useStore()
  console.log(commonStore)
  const toPrivacy = () => {
    console.log('隐私协议')
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.privacy}` })
  }
  const toService = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.service}` })
  }
  return (
    <View className='AboutUsPage__root'>
      <View className='logo'>
        <Image className='img' src={pic} />
      </View>
      {/* <View className='num'>山海云途 V 1.0.1</View> */}
      <View className='list'>
        <View className='item' onClick={toService}>
          <View className='left'>服务协议</View>
          <View className='right'>
            <Image className='jump' src={jump} />
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toPrivacy}>
          <View className='left'>隐私协议</View>
          <View className='right'>
            <Image className='jump' src={jump} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(AboutUsPage)
