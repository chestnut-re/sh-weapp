import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Image } from '@taroify/core'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import jump from '@/assets/img/yjfk/jump.png'

import './index.less'
/**
 * 个人信息
 */
const MyDataPage = () => {
  const { commonStore } = useStore()
  console.log(commonStore)
  const toSetName = () => {
    Taro.navigateTo({ url: '/pages/setName/index' })
  }
  const toSetSex = () => {
    Taro.navigateTo({ url: '/pages/setSex/index' })
  }
  const toSetAutograph = () => {
    Taro.navigateTo({ url: '/pages/setAutograph/index' })
  }
  return (
    <View className='MyDataPage__root'>
      <View className='data-list'>
        <View className='data-img'>
          <View className='item-left'>头像</View>
          <View className='item-right'>
            <Image className='img' src={pic}></Image>
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetName}>
          <View className='item-left'>昵称</View>
          <View className='item-right'>
            丛林迷雾
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetSex}>
          <View className='item-left'>性别</View>
          <View className='item-right'>
            女<Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>生日</View>
          <View className='item-right'>
            2000/02/27
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>常住地</View>
          <View className='item-right'>
            北京市 朝阳区
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetAutograph}>
          <View className='item-left'>签名</View>
          <View className='item-right'>
            天空分外晴朗，白云也绽露笑容
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(MyDataPage)
