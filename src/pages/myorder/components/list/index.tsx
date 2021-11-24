import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field, Tabs, List, Loading, Cell, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'

import './index.less'
/**
 * 我的订单
 */
const OrderListPage = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })
  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    setTimeout(() => {
      refreshingRef.current = false
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1
        newList.push(text < 10 ? '0' + text : String(text))
      }
      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 40)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  return (
    <View>
      <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
          {list.map((item) => (
            <Cell className='item' key={item}>
              <View className='card'>
                <View className='state'>待确认</View>
                <View className='content'>
                  <Image className='img' src={pic} />
                  <View className='name'>
                    三亚5日自由行(5钻)·直减300「 高 星4晚连住...
                    <View className='small-name'>
                      <View>2021/10/22出发</View>
                      <View>成人X2 儿童X2</View>
                    </View>
                  </View>
                </View>
                <View className='price'>
                  <View className='discount'>已优惠¥200</View>
                  <View>
                    共计<Text className='money'>¥5798</Text>
                  </View>
                </View>
                <View className='message'>
                  <View className='message-one'>咨询</View>
                  <View className='message-one'>分享给TA</View>
                  <View className='message-two'>填写出行人信息</View>
                </View>
              </View>
            </Cell>
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          )}
        </List>
      </PullRefresh>
    </View>
  )
}

export default observer(OrderListPage)
