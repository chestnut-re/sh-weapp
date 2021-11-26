import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
// import { ChatOutlined, WapHome, GoodsCollect, Manager } from '@taroify/icons'
import pic from '@/assets/img/home/@2x.png'
import mine from '@/assets/img/home/wodexiao@2x.png'

interface Props {
  onClick: (number) => void
}

/**
 * TabBar
 */
const TabBar: React.FC<Props> = ({ onClick }) => {
  const _itemClick = (index: number) => {
    onClick(index)
  }

  return (
    <View className='TabBar__root'>
      <View
        className='tab'
        onClick={() => {
          _itemClick(0)
        }}
      >
        <Image className='img' src={mine} />
        <View className='text'>首页</View>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(1)
        }}
      >
        <Image className='img' src={mine} />
        <View className='text'>消息</View>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(2)
        }}
      >
        <Image className='img' src={mine} />
        <View className='text'>我的</View>
      </View>
    </View>
  )
}

export default TabBar
