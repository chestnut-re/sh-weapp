import Taro, { useDidShow, useReady, usePageScroll } from '@tarojs/taro'
import { View, Text, Image, Input } from '@tarojs/components'
import { List, Loading, Swiper } from '@taroify/core'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import place from '@/assets/img/home/vdizhi@3x.png'
import search from '@/assets/img/home/sousuo-2@2x.png'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'
import { H5 } from '@/constants/h5'
import { HomeService } from '@/service/HomeService'

import './index.less'

/**
 * 首页
 */
const HomeScreen = () => {
  const { userStore } = useStore()
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [bannerList, setBannerList] = useState<any[]>([])
  const [activityList, setActivityList] = useState<any[]>([])

  useReady(() => {})
  useDidShow(() => {})
  useEffect(() => {
    console.log('getBanner')
    getGoods()
    getBanner()
    getActivity()
  }, [])

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    if (aScrollTop > 160) {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'rgba(200,200,200,.9)'
    } else {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'null'
    }
  })
  const onLoad = () => {
    // console.log('加载。。。', list)
    // setLoading(true)
    // const newList = refreshingRef.current ? [] : list
    // console.log('列表', list, newList)
    // setTimeout(() => {
    //   refreshingRef.current = false
    //   for (let i = 0; i < 9; i++) {
    //     const text = newList.length + 1
    //     newList.push(text < 1 ? '0' + text : String(text))
    //     console.log('...', newList)
    //   }
    //   setList(newList)
    //   setLoading(false)
    //   setHasMore(newList.length < 9)
    // }, 500)
  }

  // function onRefresh() {
  //   refreshingRef.current = true
  //   setLoading(false)
  //   onLoad()
  // }

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

  //getGoods
  const getGoods = async () => {
    const result = await HomeService.getGoodsPage()
    if (result.data.code === '200') {
      setList(result.data.data.records)
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
      {/* <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      <View className='home-header'>
        <View className='now-place' onClick={toLocation}>
          <Text className='text'>{userStore.city?.name ?? ''}</Text>
          <Image className='place' src={place} />
        </View>
        <View className='search-input' onClick={toSearch}>
          <Image className='search' src={search} />
          <Input type='text' placeholder='请输入' />
        </View>
      </View>
      <View className='go-done'>
        <View className='home-body'>
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
        </View>
        <View className='product-list'>
          {/* {list.length > 0 && <View>{list.length}</View>} */}
          <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={item.id} onClick={anOrder}>
                <View className='card'>
                  <View className='big-img'>
                    <Image className='big' src={item.promotionalImageUrl} />
                    <View className='label'>
                      <View className='label-pic'>{item.departureCity}</View>
                      <View className='text'>自由行</View>
                    </View>
                  </View>
                  <View className='content'>
                    <View className='text'>
                      {item.goodsName} {item.goodsNickName}
                    </View>
                    <View className='money'>成人市场标价¥ {item.personMarkPrice}</View>
                    <View className='consume'>
                      <Text>{item.shamSales}人已付款</Text>
                      <View>
                        <Image className='is-like' src={Number(item) % 2 ? noLike : liked} />
                        {item.shamLikes}
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
      </View>

      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(HomeScreen)
