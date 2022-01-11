import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { PullRefresh, List } from '@taroify/core';

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
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  // usePageScroll(({ scrollTop: aScrollTop }) => setScrollTop(aScrollTop))

  useEffect(() => {
    // WebIM.conn.getSessionList().then((res) => {
    //   console.log('WebIMWebIMWebIM', res)
    // }).catch((err) => {
    //   console.log('WebIMWebIMWebIM', err)
    // })
  }, [])

  /**
   * 消息页面跳转
   * @param type 消息类型 type = 0 系统通知，type = 1 订单消息，type = 2 行程消息
   */
  const onTabClick = (type: number) => {
    if (type === 0) {
      Taro.navigateTo({ url: '/msgPages/pages/msgPush/index?type=0' })
      console.log('系统通知')
    } else {
      console.log('其他通知')
    }
  }

  const onChatPage = (item) => {
    // Taro.navigateTo({ url: `/msgPages/pages/chat/index?title=五星团长${item}` })
  }

  return (
    <View className='MsgScreen__root'>
      <View className='msg-tabbar'>
        <View
          className='item'
          onClick={() => {
            onTabClick(0)
          }}
        >
          <View className='img-view'>
            <View className='tag'> 2 </View>
            <Image className='img' src={notice} />
          </View>
          <Text className='txt'>系统通知</Text>
        </View>
        <View
          className='item'
          onClick={() => {
            onTabClick(1)
          }}
        >
          <View className='img-view'>
            <Image className='img' src={order} />
          </View>
          <Text className='txt'>订单消息</Text>
        </View>
        <View className='item'>
          <View className='img-view'>
            <Image className='img' src={journey} />
          </View>
          <Text className='txt'>行程消息</Text>
        </View>
      </View>
      <List
        loading={loading}
        hasMore={hasMore}
        scrollTop={scrollTop}
        onLoad={() => {
          setLoading(true)
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              const text = list.length + 1
              list.push(text < 10 ? "0" + text : String(text))
            }
            setList([...list])
            setHasMore(list.length < 10)
            setLoading(false)
          }, 1000)
        }}
      >
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

        {/* <List.Placeholder>
          {loading && <View>加载中...</View>}
          {!hasMore && "没有更多了"}
        </List.Placeholder> */}
      </List>
    </View>
  )
}

export default observer(MsgScreen)
