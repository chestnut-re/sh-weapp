/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image, Input } from '@tarojs/components'
import { List, Loading, Sticky } from '@taroify/core'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { HomeService } from '@/service/HomeService'
import { H5 } from '@/constants/h5'
import search from '@/assets/img/yjfk/seachtwo.png'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'
import lose from '@/assets/img/yjfk/lose.png'
import del from '@/assets/img/password/del.png'
import { showMToast } from '@/utils/ui'
import './index.less'
/**
 * 搜索
 */
const SearchPage = () => {
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showList, setShowList] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const container = useRef()
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')
  useEffect(() => {}, [])

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    console.log(reachTop)
  })

  const onLoad = () => {
    // setLoading(true)
    // const newList = refreshingRef.current ? [] : list
    // setTimeout(() => {
    //   refreshingRef.current = false
    //   for (let i = 0; i < 20; i++) {
    //     const text = newList.length + 1
    //     newList.push(text < 1 ? '0' + text : String(text))
    //   }
    //   setList(newList)
    //   setLoading(false)
    //   setHasMore(newList.length < 21)
    // }, 500)
  }
  const setV = (e) => {
    setValue(e.detail.value)
  }
  const clearAble = () => {
    console.log(value)
    setValue('')
  }
  const searchGoods = async () => {
    if (value) {
      const result = await HomeService.searchGoodsPage({ keyword: value })
      if (result.data.code === '200') {
        setTitle(value)
        setShowList(true)
        showMToast(result.data.msg)
        setList(result.data.data.records)
      } else {
        showMToast(result.data.msg)
      }
    } else {
      showMToast('请输入相关的商品内容')
    }
  }
  const anOrder = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.goodsDetail}` })
  }
  return (
    <View className='SearchPage__root'>
      {/* <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      <View className='home-header'>
        <View className='search-input'>
          <Image className='search' src={search} onClick={searchGoods} />
          <Input
            className='input'
            type='text'
            onInput={setV}
            value={value}
            placeholder='请输入'
            onConfirm={searchGoods}
          />
          <Image className='del' src={del} onClick={clearAble} />
        </View>
      </View>
      {showList && (
        <View className='all-in'>
          {list.length < 1 && (
            <View className='home-body'>
              <Image className='lose' src={lose} />
              <View className='route'>没有搜索到”{title}“相关的结果</View>
            </View>
          )}

          <View className='product-list'>
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
      )}

      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(SearchPage)
