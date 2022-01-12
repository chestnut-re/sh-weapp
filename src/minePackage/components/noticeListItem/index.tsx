
import Taro, { usePageScroll } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading } from '@taroify/core';
import { useState, useRef } from 'react'

import './index.less'

const NoticeListItem = (props) => {

  return (
    <View className='notice-item'>
      <View className='time'>
        11/04 19:22
      </View>
      <View className='content'>
        <View className='title'>出来玩吧</View>
        <View className='info'>
          出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧出来玩吧
        </View>
      </View>
      {props.item == 2 && <View className='point' />}
    </View>
  )
}

export default NoticeListItem