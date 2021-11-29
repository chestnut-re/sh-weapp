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
 * 我的浏览
 */
const MyBrowsePage = (props) => {
  const { commonStore } = useStore()
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [follow, setFollow] = useState(false)

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
  const isFollow = (i) => {
    console.log(i)
    setFollow(!follow)
  }
  return (
    <View className='MyBrowsePage__root'>
      <View className='browse-list'>
        <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
          <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={item}>
                <View className='card'>
                  <View className='btn-box'>
                    <View
                      className={follow ? 'actuve-btn' : 'btn'}
                      onClick={() => {
                        isFollow(item)
                      }}
                    >
                      {follow ? '已关注' : '关注'}
                    </View>
                  </View>
                  <View className='top-all'>
                    <Image className='header' src={pic} />
                    <View className='text'>
                      <View className='store-name'>五星团长 张三</View>
                      <View className='store-text'>天空分外晴朗,白云也绽露笑容天空分外...</View>
                    </View>
                  </View>
                  <View className='img-list'>
                    <Image src={pic} />
                    <Image src={pic} />
                    <Image src={pic} />
                    <Image src={pic} />
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

export default observer(MyBrowsePage)
