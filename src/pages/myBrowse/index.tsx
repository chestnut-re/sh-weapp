import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Image } from '@tarojs/components'
import { List, PullRefresh } from '@taroify/core'
import { useRef, useState } from 'react'
import pic from '@/assets/img/common/shg.png'

import './index.less'

/**
 * 我的浏览
 */
const MyBrowsePage = (props) => {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    console.log('333')
  })

  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    setTimeout(() => {
      refreshingRef.current = false
      for (let i = 0; i < 20; i++) {
        const text = newList.length + 1
        newList.push(text < 1 ? '0' + text : String(text))
      }

      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 21)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }

  return (
    <View className='MyBrowsePage__root'>
      <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
          {list.map((item) => (
            <View className='item' key={item}>
              <View className='date'>2021/11/03</View>
              <View className='card'>
                <View>
                  {item % 2 ? <View className='no-jump'>已下架</View> : null}
                  <Image className='jump' src={pic} />
                </View>

                <View className={item % 2 ? 'no-right-all' : 'right-all'}>
                  <View className='text'>三亚5日自由行(5钻)·直减300『高星4…</View>
                  <View className='money'>¥2899</View>
                </View>
              </View>
            </View>
          ))}
        </List>
      </PullRefresh>
    </View>
  )
}

export default MyBrowsePage
