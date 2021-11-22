import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field, Tabs, List, Loading, Cell, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'

import './index.less'

const MyOrderPage = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState('')
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
  console.log(commonStore)

  return (
    <View className='MyOrderPage__root'>
      <Tabs className='orderTabs' value={value} onChange={setValue}>
        <Tabs.TabPane title='全部'>
          <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
            <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
              {list.map((item) => (
                <Cell key={item}>{item}</Cell>
              ))}
              {!refreshingRef.current && (
                <List.Placeholder>
                  {loading && <Loading>加载中...</Loading>}
                  {!hasMore && '没有更多了'}
                </List.Placeholder>
              )}
            </List>
          </PullRefresh>
        </Tabs.TabPane>
        <Tabs.TabPane title='待支付'>待支付</Tabs.TabPane>
        <Tabs.TabPane title='进行中'>进行中</Tabs.TabPane>
        <Tabs.TabPane title='已完成'>已完成</Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default observer(MyOrderPage)
