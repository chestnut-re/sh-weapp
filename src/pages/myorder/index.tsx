import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import { useState } from 'react'
import { observer } from 'mobx-react'
import OrderList from './components/list'
import './index.less'
/**
 * 我的订单
 */
const MyOrderPage = () => {
  const [value, setValue] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  return (
    <View className='MyOrderPage__root'>
      <Tabs className='orderTabs' value={value} onChange={setValue} sticky>
        <Tabs.TabPane title='全部'>
          <OrderList />
        </Tabs.TabPane>
        <Tabs.TabPane title='待支付'>
          <OrderList />
        </Tabs.TabPane>
        <Tabs.TabPane title='进行中'>
          <OrderList />
        </Tabs.TabPane>
        <Tabs.TabPane title='已完成'>
          <OrderList />
        </Tabs.TabPane>
        <Tabs.TabPane title='售后'>
          <OrderList />
        </Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default observer(MyOrderPage)
