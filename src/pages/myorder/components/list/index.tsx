import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { List, Loading, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import { H5 } from '@/constants/h5'
import './index.less'
import { MyOrderService } from '@/service/MyOrderService'
/**
 * 我的订单
 */
const OrderListPage = (props) => {
  const [hasMore, setHasMore] = useState(true)
  const pageRef = useRef<any>({ current: 1, loading: false })
  const [list, setList] = useState<any[]>(props.por)
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })
  const toOrderDetail = (state, id) => {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(`${H5.orderDetail}?type=${state}&orderId=${id}`)}`,
    })
  }
  const onLoad = async () => {
    console.log(pageRef.current.loading)
    console.log(pageRef.current.current)
    if (pageRef.current.loading) return
    pageRef.current.loading = true
    setLoading(true)
    let newList = pageRef.current.current === 1 ? [] : list
    MyOrderService.orderQueryUp(pageRef.current.current).then((result) => {
      refreshingRef.current = false
      if (result.data.code == '200') {
        setList(newList.concat(result.data.data.records))
        setLoading(false)
        setHasMore(result.data.data.records.length === 10)
        pageRef.current.current++
      }
      pageRef.current.loading = false
    })
  }

  function onRefresh() {
    pageRef.current.current = 1
    refreshingRef.current = true
    setLoading(true)
    onLoad()
  }
  return (
    <View className='all'>
      <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
          {list.map((item) =>
            props.state == 0 || item.state == props.state ? (
              <View className='item' key={item.id} onClick={() => toOrderDetail(item.state, item.id)}>
                <View className='card'>
                  <View>
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
                  </View>

                  <View className='message'>
                    <View className='message-one'>咨询</View>
                    <View className='message-one'>分享给TA</View>
                    <View className='message-two'>填写出行人信息</View>
                  </View>
                </View>
              </View>
            ) : null
          )}
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
