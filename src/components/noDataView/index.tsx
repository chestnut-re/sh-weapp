import React, { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import defaultsIcon from '@/assets/img/common/default.png'
import './index.less'

interface Props {
  text: string
}

/**
 * TabBar
 */
const TabBar: React.FC<Props> = ({ text = '亲，您还没有数据哦~' }) => {


  return (
    <View className='noDataView'>
      <Image className='img' src={defaultsIcon} />
      <Text className='text'>{text}</Text>
    </View>
  )
}

export default TabBar
