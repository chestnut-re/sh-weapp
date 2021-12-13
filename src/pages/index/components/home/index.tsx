import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Button, Image, Input } from '@tarojs/components'
import { List, Loading, PullRefresh, Swiper } from '@taroify/core'
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
import { H5 } from '@/constants/h5'
import { HomeService } from '@/service/home'
/**
 * 首页
 */
const HomeScreen = (props) => {
  const { userStore } = useStore()
  const [value, setValue] = useState('北京')
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [num, setNum] = useState(0)

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
    console.log(reachTop)
    if (aScrollTop > 160) {
      document.getElementsByClassName('home-header')[0].style.backgroundColor = 'rgba(200,200,200,.9)'
    } else {
      document.getElementsByClassName('home-header')[0].style.backgroundColor = 'null'
    }
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
    }, 500)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  const toSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }
  const toLocation = () => {
    Taro.navigateTo({ url: '/pages/location/index' })
  }
  // const toMyTravel = () => {
  //   Taro.navigateTo({ url: `/pages/webview/index?url=${H5.myTravel}` })
  // }
  const anOrder = () => {
    if (!userStore.isBindMobile) {
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    } else {
      Taro.navigateTo({ url: `/pages/webview/index?url=${H5.goodsDetail}` })
    }
  }
  //获取banner
  const getBanner = async () => {
    const result = await HomeService.getBanner()
    console.log(result)
  }
  //getGoods
  const getGoods = async () => {
    const result = await HomeService.getGoods('', '', '', '', '', '')
    console.log(result)
  }
  //getActivity
  const getActivity = async () => {
    const result = await HomeService.getActivity()
    console.log(result)
  }
  return (
    <View className='HomeScreen__root'>
      <Swiper className='top-s' autoplay={3000} onChange={setNum}>
        <Swiper.Item className='item'>
          <View onClick={getBanner}>大连路线站字符</View>
        </Swiper.Item>
        <Swiper.Item className='item'>
          <View onClick={getBanner}>大连路线站字符</View>
        </Swiper.Item>
        <Swiper.Item className='item'>
          <View onClick={getBanner}>大连路线站字符</View>
        </Swiper.Item>
        <Swiper.Item className='item'>
          <View onClick={getBanner}>大连路线站字符</View>
        </Swiper.Item>
        {/* <Swiper.Indicator className='custom-indicator'>{num + 1}/4</Swiper.Indicator> */}
        <Swiper.Indicator className='basic-swiped' />
      </Swiper>
      {/* <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      <View className='home-header'>
        <View className='now-place' onClick={toLocation}>
          <Text className='text'>{value}</Text>
          <Image className='place' src={place} />
        </View>
        <View className='search-input' onClick={toSearch}>
          <Image className='search' src={search} />
          <Input type='text' placeholder='养殖基地直发海参' />
        </View>
      </View>
      <View className='home-body'>
        <View className='swiper'>
          <View className='swiper-left'>
            <Image className='first' src='https://s1.ax1x.com/2021/12/10/o5jW9S.png' />
            {/* <View className='select-route'>
              <View className='season'>当季</View>
              <View className='route-name'>甄选路线</View>
            </View>
            <View className='route-text'>丽江 + 大理 + 香格里拉</View>
            <View className='route-text'>双飞6日</View> */}
          </View>
          <View className='swiper-right'>
            <View className='right-top'>
              <Image className='second' src='https://s1.ax1x.com/2021/12/10/o5WvXF.png' />
              {/* <View className='select-route'>
                <View className='now'>即刻</View>
                <View className='route-name'>就走游周边</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View> */}
            </View>
            <View className='right-bottom'>
              <Image className='third' src='https://s1.ax1x.com/2021/12/10/o5vEge.png' />
              {/* <View className='select-route'>
                <View className='local'>当地</View>
                <View className='route-name'>吃喝玩乐</View>
              </View>
              <View className='route-text'>古水北镇2日1晚 赏红叶</View> */}
            </View>
          </View>
        </View>
      </View>
      {/* <View className='home-order'>
          <View className='order-text'>
            优惠 <Text className='red-text'>「福利」</Text>路线！
          </View>
          <View className='order'>立即下单</View>
        </View> */}
      <View className='product-list'>
        <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
          {list.map((item) => (
            <View className='item' key={item} onClick={anOrder}>
              <View className='card'>
                <View className='big-img'>
                  {/* <Image className='big' src={pic} /> */}
                  <Image
                    className='big'
                    src={
                      Number(item) % 2
                        ? 'https://s1.ax1x.com/2021/12/09/ohR9jH.jpg'
                        : 'https://s1.ax1x.com/2021/12/09/ohRPud.jpg'
                    }
                  />
                  <View className='label'>
                    {/* <Image className='black' src={black} /> */}
                    <View className='label-pic'>三亚</View>
                    <View className='text'>自由行</View>
                  </View>
                </View>
                <View className='content'>
                  <View className='text'>三亚5日跟团游「星4晚连住」</View>
                  <View className='money'>¥ 2899</View>
                  <View className='consume'>
                    <Text>3456人已付款</Text>
                    <View>
                      <Image className='is-like' src={Number(item) % 2 ? noLike : liked} />
                      2356
                    </View>
                  </View>
                </View>
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
      </View>
      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(HomeScreen)
