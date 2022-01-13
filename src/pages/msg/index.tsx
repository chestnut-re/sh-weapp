import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { PullRefresh, List } from '@taroify/core';
import { MsgService } from '@/service/MsgService'

import notice from '@/assets/img/msg/msg-notice.png'
import order from '@/assets/img/msg/msg-order.png'
import journey from '@/assets/img/msg/msg-journey.png'

// import WebIM from '@/msgPages/msgUtils/WebIM'

import './index.less'



/**
 * 消息
 */
const MsgScreen = (props) => {
  const { commonStore } = useStore()

  const [unreadMsg, setUnreadMsg] = useState({}) as any

  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)


  // usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  useEffect(() => {
    getUnreadMsg()
    // WebIM.conn.getSessionList().then((res) => {
    //   console.log('WebIMWebIMWebIM', res)
    // }).catch((err) => {
    //   console.log('WebIMWebIMWebIM', err)
    // })
  }, [])

  /**
   * 消息页面跳转
   * @param type 消息类型 type = 1 系统通知，type = 2 订单消息，type = 3 行程消息
   */
  const onTabClick = (type: number) => {
    Taro.navigateTo({ url: `/minePackage/pages/systemsNotice/index?type=${type}` })
  }

  const onChatPage = (item) => {
    Taro.navigateTo({ url: `/minePackage/pages/chat/index?title=xxxx` })
  }

  const getUnreadMsg = () => {
    MsgService.getUnread().then((res) => {
      const { data: { data } } = res
      console.log(data)
      setUnreadMsg(data)
    })
  }
  const getCommentInfo = () => {

  }

  return (
    <View className='MsgScreen__root'>
      <View className='msg-tabbar'>
        <View
          className='item'
          onClick={() => {
            onTabClick(1)
          }}
        >
          <View className='img-view'>
            {unreadMsg && unreadMsg.systemMessageCount > 0 && (<View className='tag'> {unreadMsg.systemMessageCount} </View>)}
            <Image className='img' src={notice} />
          </View>
          <Text className='txt'>系统通知</Text>
        </View>
        <View
          className='item'
          onClick={() => {
            onTabClick(2)
          }}
        >
          <View className='img-view'>
            {unreadMsg && unreadMsg.orderMessageCount > 0 && (<View className='tag'> {unreadMsg.orderMessageCount} </View>)}

            <Image className='img' src={order} />
          </View>
          <Text className='txt'>订单消息</Text>
        </View>
        <View
          onClick={() => {
            onTabClick(3)
          }}
          className='item'
        >
          <View className='img-view'>
            {unreadMsg && unreadMsg.travelMessageCount > 0 && (<View className='tag'> {unreadMsg.travelMessageCount} </View>)}

            <Image className='img' src={journey} />
          </View>
          <Text className='txt'>行程消息</Text>
        </View>
      </View>
      <ScrollView scrollY className='msg-scroll' scrollWithAnimation onScrollToLower={() => getCommentInfo()}>
        {/* <Loading /> */}
        <View className='msg-list'>
          {
            list.map((item, index) => (
              <View onClick={() => onChatPage(item)} className='item' key={item}>
                <Image className='img' src={order} />
                <View className='right'>
                  <View className='info'>
                    <View className='title'>五星团长张珊</View>
                    <View className='content'>天空分外晴朗,白云也绽露笑容天空晴朗, 天空分外晴朗,白云也绽露笑容天空晴朗,</View>
                  </View>
                  <View className='time'>
                    <Text className='text'>16:33</Text>
                    {index === 1 ? (<View className='tag'>2</View>) : null}
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default observer(MsgScreen)
