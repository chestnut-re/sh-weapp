import Taro, { usePageScroll } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { List, Loading, Swiper, PullRefresh } from '@taroify/core'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import place from '@/assets/img/home/vdizhi@3x.png'
import search from '@/assets/img/home/sousuo-2@2x.png'
import GoodsItem from '@/components/GoodsItem'
import { H5 } from '@/constants/h5'
import { HomeService } from '@/service/HomeService'

import './index.less'

/**
 * 首页
 */
const HomeScreen = () => {
  const { userStore } = useStore()
  const pageRef = useRef<any>({ current: 1, loading: false })
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const refreshingRef = useRef(false)
  const [bannerList, setBannerList] = useState<any[]>([])
  const [activityList, setActivityList] = useState<any[]>([])

  useEffect(() => {
    getBanner()
    getActivity()
  }, [])

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    if (aScrollTop > 160) {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'rgba(100,208,200)'
    } else {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'null'
    }
  })

  const onLoad = async () => {
    if (pageRef.current.loading) return
    pageRef.current.loading = true
    setLoading(true)
    let newList = pageRef.current.current === 1 ? [] : list
    HomeService.getGoodsPage(pageRef.current.current).then((result) => {
      refreshingRef.current = false
      if (result.data.code == '200') {
        setList(newList.concat(result.data.data.records))
        setLoading(false)
        setHasMore(result.data.data.records.length === 10)
        pageRef.current.current++
      }
      pageRef.current.loading = false
    })
  }

  const onRefresh = () => {
    pageRef.current.current = 1
    refreshingRef.current = true
    setLoading(true)
    onLoad()
  }

  const toSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }

  const toLocation = () => {
    Taro.navigateTo({ url: '/pages/location/index' })
  }

  const anOrder = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.goodsDetail}` })
  }

  //获取banner
  const getBanner = async () => {
    const result = await HomeService.getBanner()
    if (result.statusCode === 200) {
      setBannerList(result.data.data)
    }
  }

  //getActivity
  const getActivity = async () => {
    const result = await HomeService.getActivity()
    if (result.statusCode === 200) {
      setActivityList(result.data.data)
    }
  }

  const toBannerUrl = (url) => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${url}` })
  }

  const toActivityUrl = (url) => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${url}` })
  }

  return (
    <View className='HomeScreen__root'>
      <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        {bannerList.length > 0 && (
          <View>
            <Swiper className='top-s' autoplay={3000}>
              {bannerList.map((item) => (
                <Swiper.Item className='item' key={item.id} onClick={() => toBannerUrl(item.bannerUrl)}>
                  <Image src={item.bannerImg}></Image>
                  <View>{item.title}</View>
                </Swiper.Item>
              ))}
              <Swiper.Indicator className='basic-swiped' />
            </Swiper>
            <View className='un-done'></View>
          </View>
        )}
        <View className='home-header'>
          <View className='now-place' onClick={toLocation}>
            <Text className='text'>{userStore.city?.name ?? ''}</Text>
            <Image className='place' src={place} />
          </View>
          <View className='search-input' onClick={toSearch}>
            <Image className='search' src={search} />
            <Input type='text' placeholder='' disabled />
          </View>
        </View>
        <View className='go-done'>
          {/* <View className='home-body'>
          {activityList.length > 0 && (
            <View className='swiper' onClick={() => toActivityUrl(activityList[0].activityUrl)}>
              <View className='swiper-left'>
                <Image className='first' src={activityList[0].activityImg} />
              </View>
              <View className='swiper-right'>
                <View className='right-top' onClick={() => toActivityUrl(activityList[1].activityUrl)}>
                  <Image className='second' src={activityList[1].activityImg} />
                </View>
                <View className='right-bottom' onClick={() => toActivityUrl(activityList[2].activityUrl)}>
                  <Image className='third' src={activityList[2].activityImg} />
                </View>
              </View>
            </View>
          )}
        </View> */}
          <View className='product-list'>
            <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
              {list.map((item) => (
                <GoodsItem key={item.id} onItemClick={anOrder} item={item} />
              ))}
              {!refreshingRef.current && (
                <List.Placeholder>
                  {loading && <Loading>加载中...</Loading>}
                  {!hasMore && '没有更多了'}
                </List.Placeholder>
              )}
            </List>
          </View>
        </View>
      </PullRefresh>
    </View>
  )
}

export default observer(HomeScreen)
