/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { List, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'

import { observer } from 'mobx-react'
import pic from '@/assets/img/traveler/add.png'

import './index.less'
/**
 * 出行人信息
 */
const TravelerPage = () => {
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
      for (let i = 0; i < 1; i++) {
        const text = newList.length + 1
        newList.push(text < 1 ? '0' + text : String(text))
      }
      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 10)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  return (
    <View className='TravelerPage__root'>
      <View className='add'>
        <Image className='img' src={pic} />
        <Text className='add-text'>添加出行人</Text>
      </View>
      <View className='traveler-list'>
        {/* <View className='item'>
          <View className='card'>
            <View className='left-all'>
              <View className='left-top'>
                <View className='user-name'>
                  <View className='state'>李买买</View>
                  <View className='myself'>本人</View>
                </View>
                <View className='tel'>188*****678</View>
              </View>
              <View className='left-id'>身份证 1100 **** **** **8899</View>
            </View>
            <Image className='jump' src={pic} />
          </View>
        </View>
        <View className='item'>
          <View className='card'>
            <View className='left-all'>
              <View className='left-top'>
                <View className='user-name'>
                  <View className='state'>李买买</View>
                </View>
                <View className='tel'>188*****678</View>
              </View>
              <View className='left-id'>护照 11****99</View>
            </View>
            <Image className='jump' src={pic} />
          </View>
        </View> */}
        <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
          <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={item}>
                <View className='card'>
                  <View className='left-all'>
                    <View className='left-top'>
                      <View className='user-name'>
                        <View className='state'>李买买</View>
                        <View className='myself'>本人</View>
                      </View>
                      <View className='tel'>188*****678</View>
                    </View>
                    <View className='left-id'>身份证 1100 **** **** **8899</View>
                  </View>
                  <Image className='jump' src={pic} />
                </View>
              </View>
            ))}
          </List>
        </PullRefresh>
      </View>
    </View>
  )
}

export default observer(TravelerPage)
