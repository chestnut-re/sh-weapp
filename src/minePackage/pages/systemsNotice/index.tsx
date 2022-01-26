
import Taro, { usePageScroll, useDidShow } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading, Cell, Field, Dialog, Button } from '@taroify/core';
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import MsgListItem from './../../components/noticeListItem';
import { MsgService } from '@/service/MsgService'
import NoDataView from '@/components/noDataView'

import './index.less'

let pageIndex = 1
const SystemsNoticePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMores, setHasMores] = useState(false);
  const [msgList, setMsgList] = useState<any>([])

  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    pullDownRefresh()
  }, [])

  const getFollowedList = async (pIndex = pageIndex) => {
    const msgType = Taro.getCurrentInstance().router?.params.type
    if (pIndex === 1) setIsLoaded(false);
    const {
      data: { data }
    } = await MsgService.getMsg(msgType, 1)
    console.log('datadata', data)
    setLoading(false)
    return { list: data.records, hasMore: data.total > pIndex * 10 ? true : false, isLoaded: pIndex === 1 };
  }


  const onScrollToLower = async () => {
    if (!hasMores) return
    const { list, hasMore, isLoaded } = await getFollowedList(++pageIndex);
    setMsgList(msgList.concat(list))
    setHasMores(hasMore)
    setIsLoaded(isLoaded)
  };

  useDidShow(() => {
    console.log('componentDidShow')
  })

  const pullDownRefresh = async (isLoading = true) => {
    if (isLoading) {
      setLoading(true)
    }

    pageIndex = 1;
    const res = await getFollowedList(1);
    setHasMores(res.hasMore)
    setMsgList(res.list)
    setIsLoaded(res.isLoaded)
  };

  const onReadAll = () => {
    const msgType = Taro.getCurrentInstance().router?.params.type
    MsgService.readAll(msgType).then((res) => {
      const {
        data: { data }
      } = res
      if (data) {
        pullDownRefresh(false)
      }

      console.log('data', data)
    })

  }

  const onRead = (item) => {
    MsgService.read(item.id).then((res) => {
      const {
        data: { data }
      } = res
      if (item.link) {
        Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(item.link)}` })
      }
      console.log('data', data)
    })
  }

  return (
    <View className='MsgPushPage__root'>

      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={pullDownRefresh}
        onScrollToLower={onScrollToLower}
        className='msg_scroll'
      >
        <View className='msg_list'>
          {msgList.length <= 0 ? (
            <NoDataView
              text='亲，还没有消息哦~'
            />
          ) : (
            ""
          )}
          {msgList.length > 0 && (
            <View className='unreadMsgView'>
              <View className='text'>有未读消息</View>
              <View onClick={onReadAll} className='btn'>全部已读</View>
            </View>
          )}

          {msgList.map((item, index) => (
            <MsgListItem onRead={() => { onRead(item) }} key={index} items={item} />
          ))}
          {msgList.length > 0 && !hasMore && <View className='noMore'>加载完成</View>}
        </View>
      </ScrollView>
    </View>
  )
}

export default observer(SystemsNoticePage)