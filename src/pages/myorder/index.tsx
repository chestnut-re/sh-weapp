import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, ScrollView } from '@tarojs/components'
import { Tabs, Loading } from '@taroify/core'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import OrderList from './components/orderListView'
import { MyOrderService } from '@/service/MyOrderService'
import './index.less'
import NoDataView from '@/components/noDataView'

/**
 * 我的订单
 */
let pageIndex = 1;

const tabsList = [
  { title: '全部', state: '0' },
  { title: '待付款', state: '1' },
  { title: '已失效', state: '2' },
  { title: '待核销', state: '3' },
  { title: '已完成', state: '4' },
  { title: '退款/售后', state: '5' },
]

const MyOrderPage = () => {
  const [value, setValue] = useState(0)
  const [orders, setOrders] = useState<any[]>([])

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasMores, setHasMores] = useState(false);

  useEffect(() => {
    const type = Taro.getCurrentInstance()?.router?.params?.type
    setValue(Number(type))
    pullDownRefresh(1, Number(type))
  }, [])

  const pullDownRefresh = async (page, type, isLoading = true) => {
    if (isLoading) {
      setLoading(true)
    }
    pageIndex = 1;
    const res = await getOrderList(page, type);
    setHasMores(res.hasMore)
    setOrders(res.list)
    console.log('res.list res.list', res.list)
  }

  const onScrollToLower = async () => {
    if (!hasMores) return
    setIsLoaded(true)
    const { list, hasMore } = await getOrderList(++pageIndex);
    setIsLoaded(false)
    setOrders(orders.concat(list))
    setHasMores(hasMore)
  }

  const getOrderList = async (pIndex = pageIndex, item = 0) => {
    const params = {} as any
    if (item == 0 || item == 5) {
      if (item == 5) {
        params.saleRefund = 1;
      }
    } else {
      params.state = item
    }

    const {
      data: { data }
    } = await MyOrderService.orderQueryUp(pIndex, params)
    setLoading(false)
    return { list: data.records, hasMore: data.total > pIndex * 10 ? true : false, isLoaded: pIndex === 1 };
  }

  const onTabs = async (item) => {
    if (item == value) return
    setValue(item)
    pullDownRefresh(1, item, false)
    console.log('list list list', item)
  }

  /**
  * 活动指示器
  * 这里用Taro UI的活动指示器来实现上拉加载的动画效果
  */
  const ActivityIndicator = () => {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
        <Loading>加载中...</Loading>
      </View>
    );
  }

  return (
    <View className='MyOrderPage__root'>
      <Tabs className='orderTabs' value={value} onChange={onTabs} sticky>
        {tabsList.map((item, index) => (
          <Tabs.TabPane key={`index${item.state}`} title={item.title}>

          </Tabs.TabPane>
        ))}
      </Tabs>
      <ScrollView
        className='myOrder-scroll'
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={() => pullDownRefresh(1, value)}
        onScrollToLower={onScrollToLower}
        refresherBackground='#f1f2f2'
      >

        {orders && orders.length > 0 ? (
          <OrderList por={orders} />
        ) : (
          !loading && (<NoDataView text='亲，还没有订单哦~' />)
        )}

        {orders && orders.length > 0 ? (
          isLoaded ? (
            ActivityIndicator()
          ) : (
            !hasMores && <View className='noMore'>没有更多了</View>
          )
        ) : (
          null
        )}
      </ScrollView>
    </View >
  )
}

export default observer(MyOrderPage)
