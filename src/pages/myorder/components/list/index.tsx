import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { List, Loading, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import { H5 } from '@/constants/h5'
import './index.less'
/**
 * 我的订单
 */
const OrderListPage = (props) => {
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
  const toOrderDetail = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(H5.orderDetail)}` })
  }
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
    <View className='all'>
      {/* <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      {/* <List loading={loading} hasMore={hasMore} onLoad={onLoad}> */}
      {props.por.map((item) => (
        <View className='item' key={item.id} onClick={toOrderDetail}>
          <View className='card'>
            <View className='state'>
              {item.state == 1
                ? '代付款'
                : item.state == 2
                ? '已失效'
                : item.state == 3
                ? '代确认'
                : item.state == 4
                ? '已完成'
                : item.state == 5
                ? '退款中'
                : item.state == 6
                ? '退款成功'
                : '退款失败'}
            </View>
            <View className='content'>
              <Image className='img' src={pic} />
              <View className='name'>
                {item.goodsName}
                <View className='small-name'>
                  <View>
                    {item.travelStartDate}出发 -- {item.travelEndDate}返程
                  </View>
                  <View>
                    成人X{item.adultNum} 儿童X{item.childNum}
                  </View>
                </View>
              </View>
            </View>
            <View className='price'>
              <View className='discount'>已优惠¥{item.discountAmount}</View>
              <View>
                共计<Text className='money'>¥{item.activityTotalAmount}</Text>
              </View>
            </View>
            <View className='message'>
              <View className='message-one'>咨询</View>
              <View className='message-one'>分享给TA</View>
              <View className='message-two'>填写出行人信息</View>
            </View>
          </View>
        </View>
      ))}
      {!refreshingRef.current && (
        <List.Placeholder>
          {loading && <Loading>加载中...</Loading>}
          {!hasMore && '没有更多了'}
        </List.Placeholder>
      )}
      {/* </List> */}
      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(OrderListPage)
