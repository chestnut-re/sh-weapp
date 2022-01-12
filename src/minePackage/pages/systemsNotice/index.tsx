
import Taro, { usePageScroll } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading, Cell, Field, Dialog, Button } from '@taroify/core';
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import MsgListItem from './../../components/noticeListItem';
import './index.less'


const SystemsNoticePage = (props) => {
  return (
    <View className='MsgPushPage__root'>
      <MsgListItem></MsgListItem>
      <MsgListItem></MsgListItem>
    </View>
  )
}

export default observer(SystemsNoticePage)