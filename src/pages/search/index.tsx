import Taro from '@tarojs/taro'
import { usePageScroll, useReachBottom } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Button, Image, Input } from '@tarojs/components'
import { List, Loading, PullRefresh, Sticky } from '@taroify/core'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import './index.less'
import place from '@/assets/img/home/vdizhi@2x.png'
import search from '@/assets/img/yjfk/seachtwo.png'
import pic from '@/assets/img/common/shg.png'
import black from '@/assets/img/home/black.png'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'
import back from '@/assets/img/yjfk/back.png'
import lose from '@/assets/img/yjfk/lose.png'
import del from '@/assets/img/password/del.png'
/**
 * 搜索
 */
const SearchPage = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState('请输入')
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const container = useRef()
  useEffect(() => {}, [])

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    console.log(reachTop)
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
  const toHome = () => {
    Taro.navigateTo({ url: '/pages/index/index' })
  }
  return (
    <View className='SearchPage__root' ref={container}>
      {/* <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      <Sticky className='sticky' container={container}>
        <View className='home-header'>
          <View className='now-place' onClick={toHome}>
            <Image className='place' src={back} />
          </View>
          <View className='search-input'>
            <Image className='search' src={search} />
            <Input className='input' type='text' placeholder='请输入' />
            <Image className='del' src={del} />
          </View>
        </View>
      </Sticky>
      <View className='all-in'>
        <View className='home-body'>
          <Image className='lose' src={lose} />
          <View className='route'>没有搜索到”xx“相关的结果</View>
        </View>
        <View className='product-list'>
          <View>猜你喜欢</View>
          <List loading={loading} hasMore={hasMore} scrollTop={scrollTop} onLoad={onLoad}>
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

export default observer(SearchPage)
