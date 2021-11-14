import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

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
        <Text>Home</Text>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(1)
        }}
      >
        <Text>Home2</Text>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(2)
        }}
      >
        <Text>Home3</Text>
      </View>
      <View
        className='tab'
        onClick={() => {
          _itemClick(3)
        }}
      >
        <Text>Mine</Text>
      </View>
    </View>
  )
}

export default TabBar
