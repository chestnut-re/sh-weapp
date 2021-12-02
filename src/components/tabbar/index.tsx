import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import home from '@/assets/img/home/home.png'
import homeSelected from '@/assets/img/home/home-selected.png'
import message from '@/assets/img/home/message.png'
import messageSelected from '@/assets/img/home/message-selected.png'
import mine from '@/assets/img/home/mine.png'
import mineSelected from '@/assets/img/home/mine-selected.png'
import './index.less'

interface Props {
  onClick: (number) => void
  value: number
}

/**
 * TabBar
 */
const TabBar: React.FC<Props> = ({ onClick, value }) => {
  const _itemClick = (index: number) => {
    onClick(index)
  }

  return (
    <View className='TabBar__root__wrap'>
      <View className='TabBar__root'>
        <View
          className={['tab', value === 0 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(0)
          }}
        >
          <View>
            <Image className='img' src={value === 0 ? homeSelected : home} />
          </View>
          <View className='text'>首页</View>
        </View>
        <View
          className={['tab', value === 1 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(1)
          }}
        >
          <View>
            <Image className='img' src={value === 1 ? messageSelected : message} />
          </View>
          <View className='text'>消息</View>
        </View>
        <View
          className={['tab', value === 2 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(2)
          }}
        >
          <View>
            <Image className='img' src={value === 2 ? mineSelected : mine} />
          </View>
          <View className='text'>我的</View>
        </View>
      </View>
    </View>
  )
}

export default TabBar
