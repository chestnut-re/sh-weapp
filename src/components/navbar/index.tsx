import React, { useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import './index.less'
import systemInfo from '@/utils/systemInfo'


interface Props {
  className: string
}

/**
 * TabBar
 */
const NavBar: React.FC<Props> = ({ children, className }) => {


  return (
    <View className={`homeNavBars ${className}`}>
      <View style={{ height: `${systemInfo.statusBarHeight / systemInfo.pixelRate}rpx` }} className='status-bar'></View>
      <View style={{ height: `${systemInfo.capsuleHeight / systemInfo.pixelRate}rpx` }} className='capsule-line'>
        {children}
      </View>
    </View>
  )
}

export default NavBar
