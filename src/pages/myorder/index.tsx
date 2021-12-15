import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field, Tabs, List, Loading, Cell, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import OrderList from './components/list'
import './index.less'
/**
 * 我的订单
 */
const MyOrderPage = (props) => {
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
