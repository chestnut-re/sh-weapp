import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, List, Loading, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import { Arrow } from '@taroify/icons'

import { observer } from 'mobx-react'

import './index.less'
import pic from '@/assets/img/common/shg.png'
/**
 * 我的点赞
 */
const MyLikedPage = (props) => {
  const { commonStore } = useStore()
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toAboutUs = () => {
    Taro.navigateTo({ url: '/pages/aboutUs/index' })
  }
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
    }, 500)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  return (
    <View className='MyLikedPage__root'>
      <View className='liked-list'>
        <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
          <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={item}>
                <View className='date'>2021/11/03</View>
                <View className='card'>
                  <Image className='jump' src={pic} />
                  <View className='right-all'>
                    <View className='text'>三亚5日自由行(5钻)·直减300『高星4…</View>
                    <View className='money'>¥2899</View>
                  </View>
                </View>
              </View>
            ))}
          </List>
        </PullRefresh>
      </View>
    </View>
  )
}

export default observer(MyLikedPage)
