import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import OrderList from './components/list'
import { MyOrderService } from '@/service/MyOrderService'
import './index.less'
/**
 * 我的订单
 */
const MyOrderPage = () => {
  const [value, setValue] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  useEffect(() => {
    orderList()
  }, [])
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  //获取订单列表
  const orderList = async () => {
    const result = await MyOrderService.orderQuery()
    if (result.statusCode === 200) {
      console.log(result.data.data)
      setOrders(result.data.data.records)
    }
  }
  return (
    <View className='MyOrderPage__root'>
      <Tabs className='orderTabs' value={value} onChange={setValue} sticky>
        <Tabs.TabPane title='全部'>
          <OrderList por={orders} state={0} />
        </Tabs.TabPane>
        <Tabs.TabPane title='待付款'>
          <OrderList por={orders} state={1} />
        </Tabs.TabPane>
        {/* <Tabs.TabPane title='已失效'>
          <OrderList por={orders} state={2} />
        </Tabs.TabPane> */}
        <Tabs.TabPane title='待核销'>
          <OrderList por={orders} state={3} />
        </Tabs.TabPane>
        <Tabs.TabPane title='已完成'>
          <OrderList por={orders} state={4} />
        </Tabs.TabPane>
        <Tabs.TabPane title='退款'>
          <OrderList por={orders} state={5} />
        </Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default observer(MyOrderPage)
