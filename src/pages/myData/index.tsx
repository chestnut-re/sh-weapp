import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Image } from '@taroify/core'
import { Arrow } from '@taroify/icons'
import { observer } from 'mobx-react'

import './index.less'

const MyDataPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  return (
    <View className='MyDataPage__root'>
      <View className='data-list'>
        <View className='data-img'>
          <View className='item-left'>头像</View>
          <View className='item-right'>
            <Image className='img'></Image>
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>昵称</View>
          <View className='item-right'>
            丛林迷雾
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>性别</View>
          <View className='item-right'>
            女
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>生日</View>
          <View className='item-right'>
            2000/02/27
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>常住地</View>
          <View className='item-right'>
            北京市 朝阳区
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='item'>
          <View className='item-left'>签名</View>
          <View className='item-right'>
            天空分外晴朗，白云也绽露笑容
            <View className='item-left'>
              <Arrow />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(MyDataPage)
