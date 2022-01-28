// eslint-disable-next-line @typescript-eslint/no-shadow

import Taro, { usePageScroll, useDidShow } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { PullRefresh, List, Loading, Cell, Field, Dialog, Button } from '@taroify/core';
import { useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react'
import MsgListItem from './../../components/noticeListItem';
import { MsgService } from '@/service/MsgService'
import NoDataView from '@/components/noDataView'
import { H5 } from '@/constants/h5'

import './index.less'

let pageIndex = 1
const SystemsNoticePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMores, setHasMores] = useState(false);
  const [msgList, setMsgList] = useState<any>([])
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [msgTypes, setMsgTypes] = useState<any>('');

  useEffect(() => {
    const msgType = Taro.getCurrentInstance().router?.params.type

    let pageTitle = '系统通知'
    if (msgType == '1') {
      pageTitle = '系统通知'
    } else if (msgType == '2') {
      pageTitle = '订单消息'
    } else if (msgType == '3') {
      pageTitle = '行程消息'
    }
    Taro.setNavigationBarTitle({ title: pageTitle })
    setMsgTypes(msgType)
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
    MsgService.readAll(msgTypes).then((res) => {
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
    if (item.isRead == 0) {
      MsgService.read(item.id).then((res) => {
        const {
          data: { data }
        } = res
      })
    }

    console.log('data', item)

    if (msgTypes == 2) {
      let stateStr = ''
      switch (item.extendMap.orderState) {
        case 1:
          stateStr = '订单待支付';
          break
        case 3:
          stateStr = '付款';
          break
        case 4:
          stateStr = '订单已完成';
          break
        case 5:
          stateStr = '退款';
          break
        default:

      }
      Taro.navigateTo({
        url: `/pages/webview/index?url=${encodeURIComponent(`${H5.orderDetail}?type=${item.extendMap.orderState}&orderId=${item.extendMap.orderId}`)}`,
      })
    }

  }

  return (
    <View className='MsgPushPage__root'>

      <ScrollView
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={() => pullDownRefresh()}
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
            <MsgListItem onRead={onRead} key={index} items={item} />
          ))}
          {msgList.length > 0 && !hasMore && <View className='noMore'>加载完成</View>}
        </View>
      </ScrollView>
    </View>
  )
}

export default observer(SystemsNoticePage)