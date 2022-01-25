import { View, ScrollView, Image, Input, Text } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro' // Taro 专有 Hooks
import { observer } from 'mobx-react'
import { useEffect, useCallback, useState } from 'react'
import { Loading, Swiper } from '@taroify/core'
import Img from '@/components/Img'
import { commonStore, useStore } from '@/store/context'
import place from '@/assets/img/home/vdizhi@3x.png'
import search from '@/assets/img/home/sousuo-2@2x.png'
import GoodsItem from '@/components/GoodsItem'
import { H5 } from '@/constants/h5'
import { HomeService } from '@/service/HomeService'
import { getUrlParams } from '@/utils/webviewUtils'

import NavBar from '@/components/navbar'

import './index.less'

let pageIndex = 1

const HomeScreen = () => {
  const { userStore, homeStore } = useStore()

  const [bannerList, setBannerList] = useState<any>([])
  const [activityList, setActivityList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasMores, setHasMores] = useState(false)
  const [goodsList, setGoodsList] = useState<any[]>([])

  useEffect(() => {
    pullDownRefresh()

    if (Taro.getCurrentInstance()?.router?.params?.q) {
      const q = decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.q ?? '')

      if (q.startsWith('https://travel.mountainseas.cn/miniapp?action=go')) {
        const data = getUrlParams(q)['data']
        if (data) {
          const dData = decodeURIComponent(data)
          const jsonData = JSON.parse(dData)
          if (jsonData.type === 'web') {
            const webMiniPath = `/pages/webview/index?url=${encodeURIComponent(jsonData['path'])}`
            Taro.navigateTo({ url: webMiniPath })
          }
        }
      } else {
        const bizId = getUrlParams(q)['bizId']
        const jumpTo = getUrlParams(q)['jumpTo']
        commonStore.bizId = bizId
        commonStore.jumpTo = jumpTo

        // 判断是否登录，没有登录先去登录
        if (userStore.isBindMobile) {
          // 已经登录
          Taro.navigateTo({ url: decodeURIComponent(jumpTo) })
        } else {
          // 未登录
          commonStore.setAfterLoginCallback(() => {
            Taro.redirectTo({ url: decodeURIComponent(jumpTo) }) // 替换登录页面
            commonStore.removeAfterLoginCallback()
          })
          Taro.navigateTo({ url: '/pages/login/index' })
        }
      }
    }
  }, [homeStore.refreshHomePage])

  useDidShow(() => {
    console.log('进入页面', homeStore.refreshHomePage)
  })

  const getGoodsList = async (pIndex = pageIndex) => {
    const {
      data: { data },
    } = await HomeService.getGoodsPage(pIndex)
    setLoading(false)
    return { list: data.records, hasMore: data.total > pIndex * 10 ? true : false, isLoaded: pIndex === 1 }
  }

  const onPageScroll = (scrollTop) => {
    if (scrollTop.detail.scrollTop > 160) {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'rgb(77, 207, 197)'
    } else {
      document.getElementsByClassName('home-header')[0]['style'].backgroundColor = 'transparent'
    }
  }

  const onScrollToLower = async () => {
    if (!hasMores) return
    setIsLoaded(true)
    const { list, hasMore } = await getGoodsList(++pageIndex)
    setIsLoaded(false)
    setGoodsList(goodsList.concat(list))
    setHasMores(hasMore)
  }

  const pullDownRefresh = async () => {
    setLoading(true)
    pageIndex = 1
    getBanner()
    getActivity()
    const res = await getGoodsList(1)
    setHasMores(res.hasMore)
    setGoodsList(res.list)
    console.log('res.isLoaded', res.isLoaded)
  }

  const toSearch = () => {
    Taro.navigateTo({ url: '/pages/search/index' })
  }

  const toLocation = () => {
    Taro.navigateTo({ url: '/pages/location/index' })
  }

  const anOrder = (e) => {
    if (!userStore.isBindMobile) {
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    const l = `${H5.goodsDetail}?id=${e.id}&goodsPriceId=${e.goodsPriceId}&isRebate=${e.isRebate}&isPurchase=${e.isPurchase}&isPurchaseAdd=${e.isPurchaseAdd}&tagCity=${e.departureCity}&tapInfo=${e.goodsTypeTag}`
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
  }

  //获取banner
  const getBanner = async () => {
    const result = await HomeService.getBanner()
    if (result.statusCode === 200) {
      setBannerList(result.data.data)
    }
  }

  const getActivity = async () => {
    const result = await HomeService.getActivity()
    if (result.statusCode === 200) {
      const poshDataNum = 3 - result.data.data.length
      const newActivityList = result.data.data as any
      for (let index = 0; index < poshDataNum; index++) {
        newActivityList.push({
          activityImg: '',
          id: '',
        })
      }

      setActivityList(poshDataNum == 3 ? [] : newActivityList)
    }
  }

  const toBannerUrl = (url) => {
    if (!userStore.isBindMobile) {
      console.log(userStore.isBindMobile)
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(url)}` })
  }

  const toActivityUrl = (id) => {
    if (id != '') {
      const l = `${H5.specialEvents}?id=${id}`
      Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
    }
  }

  /**
   * 活动指示器
   * 这里用Taro UI的活动指示器来实现上拉加载的动画效果
   */
  const ActivityIndicator = () => {
    return (
      <View style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
        <Loading>加载中...</Loading>
      </View>
    )
  }
  return (
    <View className='HomeScreen__root lazy-view'>
      <NavBar className='home-header'>
        <View className='home-nav'>
          <View className='now-place' onClick={toLocation}>
            <Text className='text'>
              {userStore.city?.name && userStore.city?.name.length > 4
                ? userStore.city?.name.substr(0, 4) + '...'
                : userStore.city?.name ?? ''}
            </Text>
            <Image className='place' src={place} />
          </View>
          <View className='search-input' onClick={toSearch}>
            <View>
              <Image className='search' src={search} />
            </View>

            <Input type='text' placeholder='搜索感兴趣的旅行路线' disabled />
          </View>
          <View className='capsule' />
          {/* <View
            className='saoyisao'
            onClick={() => {
              Taro.scanCode({}).then((res) => {
                console.log(res)
                try {
                  const params = getUrlParams(res.result)
                  // shtravel://app?data=%7B%22path%22%3A%22https%3A%2F…466343298036797440%22%2C%22type%22%3A%22web%22%7D
                  const d = JSON.parse(decodeURIComponent(params['data']))
                  if (d.type === 'web') {
                    commonStore.bizId = getUrlParams(d['path'])['bizId']
                    console.log(commonStore.bizId)

                    Taro.navigateTo({ url: `/pages/webview/index?url=${d['path']}` })
                  } else {
                    showMToast('请扫描店铺二维码')
                  }
                } catch (e) {
                  console.log(e)
                }
              })
            }}
          >
            <Image className='sao' src={sao} />
          </View> */}
        </View>
      </NavBar>
      <ScrollView
        className='home-scroll'
        scrollY
        scrollWithAnimation
        refresherEnabled
        refresherTriggered={loading}
        onRefresherRefresh={pullDownRefresh}
        style={{ height: '100vh' }}
        onScrollToLower={onScrollToLower}
        onScroll={onPageScroll}
      >
        <View className='banner'>
          {bannerList && bannerList.length > 0 && (
            <Swiper className='top-s' autoplay={3000}>
              {bannerList.map((item) => (
                <Swiper.Item className='item' key={item.id} onClick={() => toBannerUrl(item.bannerUrl)}>
                  <Img url={item.bannerImg} className='' />
                </Swiper.Item>
              ))}
              <Swiper.Indicator className='basic-swiped' />
            </Swiper>
          )}
          {/* <View className='un-done'></View> */}
          <View style={{ bottom: '-6px' }} className='mask' />
        </View>

        <View className='go-done'>
          <View className='home-body'>
            {activityList && activityList.length > 0 && (
              <View className='swiper'>
                <View onClick={() => toActivityUrl(activityList[0] && activityList[0].id)} className='swiper-left'>
                  <Img
                    url={
                      activityList[0].activityImg || 'https://travel-h5.oss-cn-beijing.aliyuncs.com/img/%402x-fffd.png'
                    }
                    className='first'
                  />
                </View>
                <View className='swiper-right'>
                  <View className='right-top' onClick={() => toActivityUrl(activityList[1] && activityList[1].id)}>
                    <Img
                      url={
                        activityList[1].activityImg ||
                        'https://travel-h5.oss-cn-beijing.aliyuncs.com/img/%403x-45c7.png'
                      }
                      className='second'
                    />
                  </View>
                  <View className='right-bottom' onClick={() => toActivityUrl(activityList[2] && activityList[2].id)}>
                    <Img
                      url={
                        activityList[2].activityImg ||
                        'https://travel-h5.oss-cn-beijing.aliyuncs.com/img/%403x%20(1)-e3fc.png'
                      }
                      className='third'
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
          <View className='product-list'>
            {goodsList &&
              goodsList.length > 0 &&
              goodsList.map((item) => (
                <GoodsItem
                  key={item.id}
                  onItemClick={() => {
                    anOrder(item)
                  }}
                  item={item}
                />
              ))}
          </View>
          {goodsList && goodsList.length > 0
            ? isLoaded
              ? ActivityIndicator()
              : !hasMores && <View className='noMore'>没有更多了</View>
            : null}
        </View>
      </ScrollView>
    </View>
  )
}

export default observer(HomeScreen)
