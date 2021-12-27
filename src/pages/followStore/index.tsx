/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View } from '@tarojs/components'

import { List, PullRefresh } from '@taroify/core'
import { H5 } from '@/constants/h5'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { ShopService } from '@/service/ShopService'
import Img from '@/components/Img'
import './index.less'
/**
 * 我的浏览
 */
const MyBrowsePage = () => {
  const pageRef = useRef<any>({ current: 1 })

  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  const toAbulkshop = (item) => {

    Taro.navigateTo({ url: `/pages/webview/index?id=${item['id']}&url=${H5.groupShop}` })
  }
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })
  useEffect(() => {

  }, [])

  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    ShopService.shopList(pageRef.current.current).then(res => {
      refreshingRef.current = false
      setLoading(false)
      const { data } = res
      if (data) {
        data.data.records.map(item => {
          newList.push(item)
        })
        setList(newList)
        setLoading(false)
        setHasMore(data.data.records.length >= 5)
        pageRef.current.current++
      }
    })
  }

  function onRefresh() {
    refreshingRef.current = true
    pageRef.current.current = 1
    onLoad()
  }
  const isFollow = (item) => {
    const params = {
      attentionState: item.attentionState == 1 ? 0 : 1,
      shopId: `${item.id}`,
    }
    ShopService.attention(params).then(res => {
      console.log(res)
      const newList = [...list]
      newList.map(items => {
        if (item.id == items['id']) {
          items['attentionState'] = item.attentionState == 1 ? '0' : '1'
        }
      })
      setList(newList)
    })
  }
  return (
    <View className='MyBrowsePage__root'>
      <View className='browse-list'>

        <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>

          <List offset={30} loading={loading} hasMore={hasMore} onLoad={onLoad}>
            {list.map((item) => (
              <View className='item' key={`${item['id']}`}>
                <View className='card'>
                  <View className='btn-box'>
                    <View
                      className={item['attentionState'] == '1' ? 'actuve-btn' : 'btn'}
                      onClick={() => {
                        isFollow(item)
                      }}
                    >
                      {item['attentionState'] == '1' ? '已关注' : '关注'}
                    </View>
                  </View>
                  <View className='top-all' onClick={() => toAbulkshop(item)}>
                    <Img
                      url={item['shopHeadUrl']}
                      className='header'
                    />
                    <View className='text'>
                      <View className='store-name'>{item['shopName']}</View>
                      <View className='store-text'>{item['shopDesc']}</View>
                    </View>
                  </View>
                  <View className='img-list'>
                    {item['promotionalImageUrlList'].length > 0 && item['promotionalImageUrlList'].map((items, index) => (
                      index < 4 && (
                        <Img
                          key={`index${index}`}
                          url={items}
                          className='Image'
                        />
                      )
                    ))}
                  </View>
                </View>
              </View>
            ))}
            {!refreshingRef.current && (
              <List.Placeholder>
                {loading && '加载中...'}
                {!hasMore && "没有更多了"}
              </List.Placeholder>
            )}
          </List>

        </PullRefresh>

      </View>
    </View>
  )
}

export default observer(MyBrowsePage)
