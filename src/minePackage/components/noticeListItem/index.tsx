
import Taro, { usePageScroll } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading } from '@taroify/core';
import { useState, useRef, useEffect } from 'react'
import { filterCurDate, getMyDate } from '@/utils/date'

import './index.less'

const NoticeListItem = (props) => {
  const itemData = props.items
  const [isRead, setIsRead] = useState(null) as any
  useEffect(() => {
    setIsRead(itemData.isRead)
  }, [itemData])

  const onRead = () => {
    if (props.onRead) {
      props.onRead(itemData)
      isRead == 0 && setIsRead(1)
    }
  }

  return (
    <View className='notice-item'>
      <View className='time'>
        {itemData.createTime}
      </View>
      <View onClick={onRead} className='content'>
        <View className='title'>{itemData.title}</View>
        <View className='info'>
          {itemData.content}
        </View>
      </View>
      {isRead == 0 && <View className='point' />}
    </View>
  )
}

export default NoticeListItem