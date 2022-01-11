/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Image } from '@tarojs/components'
import { List, PullRefresh } from '@taroify/core'
import { useRef, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'
import { LikeService } from '@/service/Like'
import Img from '@/components/Img'
import { H5 } from '@/constants/h5'
import NoDataView from '@/components/noDataView'



/**
 * 我的点赞
 */
const MyLikedPage = () => {
  const pageRef = useRef<any>({ current: 1, loading: false })

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
  useEffect(() => {
    onLoad()
  }, [])
  const onLoad = () => {
    const params = {} as any
    params.type = 1
    params.size = 10
    params.current = pageRef.current.current
    setLoading(true)
    let newList = pageRef.current.current === 1 ? [] : list
    LikeService.likeList(params).then((res) => {
      refreshingRef.current = false

      const { data } = res.data
      console.log(data.records)
      setList(newList.concat(data.records))
      setLoading(false)
      setHasMore(data.records.length >= 10)
      pageRef.current.current++

    })
  }
  function onRefresh() {
    pageRef.current.current = 1
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  const anOrder = (e) => {
    const l = `${H5.goodsDetail}?id=${e.goodsId}&goodsPriceId=${e.goodsPriceId}`
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
  }
  return (
    <View className='MyLikedPage__root'>
      {list.length > 0 ? (
        <View className='liked-list'>
          <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
            <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
              {list.map((item) => (
                <View onClick={() => { anOrder(item) }} className='item' key={item['goodsId']}>
                  <View className='date'>{item['createTime']}</View>
                  <View className='card'>
                    {item['state'] == 3 ? <View className='no-jump'>已下架</View> : null}
                    <Img
                      url={item['promotionalImageUrl']}
                      className='jump'
                    />
                    <View className={item['state'] == 3 ? 'no-right-all' : 'right-all'}>
                      <View className='text'>{item['goodsName']}</View>
                      <View className='money'>{`¥ ${item['personCurrentPrice'] || 0}`}</View>
                    </View>
                  </View>
                </View>
              ))}
            </List>
          </PullRefresh>
        </View>
      ) : (
        <NoDataView
          text='亲，还没有浏览商品记录哦~'
        />
      )}
    </View>
  )
}

export default observer(MyLikedPage)
