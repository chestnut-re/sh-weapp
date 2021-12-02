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
}

/**
 * TabBar
 */
const TabBar: React.FC<Props> = ({ onClick }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const _itemClick = (index: number) => {
    onClick(index)
    setActiveIndex(index)
  }

  return (
    <View className='TabBar__root__wrap'>
      <View className='TabBar__root'>
        <View
          className={['tab', activeIndex === 0 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(0)
          }}
        >
          <View>
            <Image className='img' src={activeIndex === 0 ? homeSelected : home} />
          </View>
          <View className='text'>首页</View>
        </View>
        <View
          className={['tab', activeIndex === 1 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(1)
          }}
        >
          <View>
            <Image className='img' src={activeIndex === 1 ? messageSelected : message} />
          </View>
          <View className='text'>消息</View>
        </View>
        <View
          className={['tab', activeIndex === 2 ? 'active' : null].join(' ')}
          onClick={() => {
            _itemClick(2)
          }}
        >
          <View>
            <Image className='img' src={activeIndex === 2 ? mineSelected : mine} />
          </View>
          <View className='text'>我的</View>
        </View>
      </View>
    </View>
  )
}

export default TabBar
