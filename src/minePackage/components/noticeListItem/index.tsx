
import Taro, { usePageScroll } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading } from '@taroify/core';
import { useState, useRef } from 'react'
import { filterCurDate, getMyDate } from '@/utils/date'

import './index.less'

const NoticeListItem = (props) => {
  const itemData = props.items
  return (
    <View className='notice-item'>
      <View className='time'>
        {itemData.createTime}
      </View>
      <View onClick={props.onRead} className='content'>
        <View className='title'>{itemData.title}</View>
        <View className='info'>
          {itemData.content}
        </View>
      </View>
      {itemData.isRead == 0 && <View className='point' />}
    </View>
  )
}

export default NoticeListItem