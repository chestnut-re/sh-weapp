import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'
import { ChatOutlined, WapHome, GoodsCollect, Manager } from '@taroify/icons'

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
        <WapHome size='30' />
        <Text>首页</Text>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(1)
        }}
      >
        <GoodsCollect size='30' />
        <Text>消息</Text>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(2)
        }}
      >
        <Manager size='30' />
        <Text>我的</Text>
      </View>
    </View>
  )
}

export default TabBar
