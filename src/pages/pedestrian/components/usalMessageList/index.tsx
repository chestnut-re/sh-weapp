import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field, Tabs, List, Loading, Cell, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import jump from '@/assets/img/yjfk/jump.png'
import add from '@/assets/img/traveler/add.png'
import per from '@/assets/img/traveler/per.png'
import './index.less'
/**
 * 常用信息
 */
const UsualMessageListPage = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  // console.log(this.props.property)
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
      setHasMore(newList.length < 11)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  return (
    <View className='usual-list'>
      <View className='add-mode'>
        <View className='add'>
          <Image className='img' src={add} />
          <Text className='add-text'>添加{props.onName ? '出行人' : '收货地址'}</Text>
        </View>
      </View>
      <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
          {list.map((item) => (
            <View className='item' key={item}>
              <View className='card'>
                <View className='left-all'>
                  <View className='left-top'>
                    <View className='user-name'>
                      <View className='state'>李买买</View>
                      {item === '01' && props.onName === '出行人' ? <View className='myself'>本人</View> : null}
                      {item === '01' && props.onName === '地址' ? <View className='default'>默认</View> : null}
                    </View>
                    <View className='tel'>188*****678</View>
                  </View>
                  <View className='left-id'>
                    {props.onName === '出行人' && Number(item) % 2
                      ? '身份证 1100 **** **** **8899'
                      : props.onName === '地址'
                      ? '北京市海淀区 中关村大厦A-888'
                      : '护照 11****99'}
                  </View>
                </View>
                <Image className='jump' src={jump} />
              </View>
            </View>
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

export default observer(UsualMessageListPage)
