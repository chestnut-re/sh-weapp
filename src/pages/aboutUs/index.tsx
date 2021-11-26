import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'

const AboutUsPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  return (
    <View className='AboutUsPage__root'>
      <View className='logo'>
        <Image className='img' src={pic} />
      </View>
      {/* <View className='num'>山海云途 V 1.0.1</View> */}
      <View className='list'>
        <View className='item'>
          <View className='left'>服务协议</View>
          <View className='right'>
            <Arrow />
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='left'>隐私协议</View>
          <View className='right'>
            <Arrow />
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(AboutUsPage)
