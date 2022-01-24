import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, ScrollView } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import OrderList from './components/list'
import { MyOrderService } from '@/service/MyOrderService'
import './index.less'
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


  useEffect(() => {
    // orderList()
    pullDownRefresh()
  }, [])

  const pullDownRefresh = async () => {
    setLoading(true)
    pageIndex = 1;
    const res = await getOrderList(1);
    // setHasMores(res.hasMore)
    setOrders(res.list)
  }

  //获取订单列表
  const orderList = async () => {
    const result = await MyOrderService.orderQuery()
    if (result.statusCode === 200) {
      console.log(result.data.data)
      setOrders(result.data.data.records)
    }
  }
  const getOrderList = async (pIndex = pageIndex) => {
    const {
      data: { data }
    } = await MyOrderService.orderQueryUp(pIndex)
    setLoading(false)
    return { list: data.records, hasMore: data.total > pIndex * 10 ? true : false, isLoaded: pIndex === 1 };
  }

  const onTabs = (item) => {
    setValue(item)
  }
  return (
    <View className='MyOrderPage__root'>

      <Tabs className='orderTabs' value={value} onChange={onTabs} sticky>
        {tabsList.map((item, index) => (
          <Tabs.TabPane key={`index${item.state}`} title={item.title}>
            <ScrollView
              className='myOrder-scroll'
              scrollY
              scrollWithAnimation
              refresherEnabled
              // refresherTriggered={loading}
              onRefresherRefresh={pullDownRefresh}
            // style={{ height: "100vh" }}
            // onScrollToLower={onScrollToLower}
            // onScroll={onPageScroll}
            >
              <OrderList por={orders} state={item.state} />

            </ScrollView>

          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  )
}

export default observer(MyOrderPage)
