
import Taro, { usePageScroll } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading, Cell, Field, Dialog, Button } from '@taroify/core';
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import MsgListItem from './../../components/noticeListItem';
import { MsgService } from '@/service/MsgService'
import NoDataView from '@/components/noDataView'

import './index.less'


const SystemsNoticePage = (props) => {
  const [msgList, setMsgList] = useState<any>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    getFollowedList()
  }, [])
  const getFollowedList = () => {
    if (!hasMore) return
    const msgType = Taro.getCurrentInstance().router?.params.type
    MsgService.getMsg(msgType).then((res) => {
      const { data } = res.data
      if (data) {
        setMsgList(msgList.concat(data))
        setHasMore(false)
      }
    })
  }
  return (
    <View className='MsgPushPage__root'>
      <ScrollView scrollY onScrollToLower={getFollowedList} className='msg_list'>
        {msgList.length <= 0 ? (
          <NoDataView
            text='亲，还没有消息哦~'
          />
        ) : (
          ""
        )}
        {msgList.map((item, index) => (
          <MsgListItem key={index} items={item} />
        ))}
        {msgList.length > 0 && !hasMore && <View className='noMore'>加载完成</View>}
      </ScrollView>
    </View>
  )
}

export default observer(SystemsNoticePage)