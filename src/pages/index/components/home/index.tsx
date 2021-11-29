import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Button, Image, Input } from '@tarojs/components'
import { List, Loading, PullRefresh } from '@taroify/core'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import './index.less'
import place from '@/assets/img/home/vdizhi@2x.png'
import search from '@/assets/img/home/sousuo-2@2x.png'
import pic from '@/assets/img/common/shg.png'
import black from '@/assets/img/home/black.png'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'
/**
 * 首页
 */
const HomeScreen = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState('北京')
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  useEffect(() => {}, [])

  const toDemoPage = () => {
    Taro.navigateTo({ url: '/pages/demo/index' })
  }

  const toWebViewPage = () => {
    const url = decodeURIComponent('http://123.56.248.148/protocol/privacy')
    Taro.navigateTo({ url: `/pages/webview/index?url=${url}` })
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
    <View className='HomeScreen__root'>
      <View className='home-header'>
        <View className='now-place'>
          <Text className='text'>{value}</Text>
          <Image className='place' src={place} />
        </View>
        <View className='search-input'>
          <Image className='search' src={search} />
          <Input type='text' placeholder='养殖基地直发海参' focus />
        </View>
      </View>
      <View className='home-body'>
        <View className='route'>大连路线站字符</View>
        <View className='swiper'>
          <View className='swiper-left'>
            <View className='select-route'>
              <View className='season'>当季</View>
              <View className='route-name'>甄选路线</View>
            </View>
            <View className='route-text'>丽江 + 大理 + 香格里拉</View>
            <View className='route-text'>双飞6日</View>
          </View>
          <View className='swiper-right'>
            <View className='right-top'>
              <View className='select-route'>
                <View className='now'>即刻</View>
                <View className='route-name'>就走游周边</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View>
            </View>
            <View className='right-bottom'>
              <View className='select-route'>
                <View className='local'>当地</View>
                <View className='route-name'>吃喝玩乐</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View>
            </View>
          </View>
        </View>
      </View>
      <View className='home-order'>
        <View className='order-text'>
          优惠 <Text className='red-text'>「福利」</Text>路线！
        </View>
        <View className='order'>立即下单</View>
      </View>
      <View className='product-list'>
        <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
          <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={item}>
                <View className='card'>
                  <View className='big-img'>
                    <Image className='big' src={pic} />
                    <View className='label'>
                      <Image className='black' src={black} />
                      <Text className='label-pic'>三亚</Text>
                      <Text className='text'>自由行</Text>
                    </View>
                  </View>
                  <View className='content'>
                    <View className='text'>三亚5日跟团游「星4晚连 住」</View>
                    <View className='money'>¥ 2899</View>
                    <View className='consume'>
                      <Text>3456人已付款</Text>
                      <View>
                        <Image className='is-like' src={noLike} />
                        2356
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </List>
        </PullRefresh>
      </View>
      <Button onClick={toDemoPage}>跳转到 Demo1</Button>
      <Button onClick={toWebViewPage}>跳转到 WebView</Button>
      <Button
        onClick={() => {
          Taro.scanCode({}).then((res) => {
            console.log(res)
          })
        }}
      >
        扫码
      </Button>
    </View>
  )
}

export default observer(HomeScreen)
