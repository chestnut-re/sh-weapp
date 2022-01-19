/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Image, Input } from '@tarojs/components'
import { List } from '@taroify/core'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import { HomeService } from '@/service/HomeService'
import { H5 } from '@/constants/h5'
import search from '@/assets/img/yjfk/seachtwo.png'
import lose from '@/assets/img/yjfk/lose.png'
import del from '@/assets/img/password/del.png'
import { showMToast } from '@/utils/ui'
import GoodsItem from '@/components/GoodsItem'
import { useStore } from '@/store/context'

import './index.less'

/**
 * 搜索
 */
const SearchPage = () => {
  const { userStore } = useStore()
  const pageRef = useRef<any>({ current: 1 })
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showList, setShowList] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const [value, setValue] = useState('')
  const [title, setTitle] = useState('')

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  const onLoad = async () => {
    if (pageRef.current.loading) return
    if (!value) {
      showMToast('请输入相关的商品内容')
    }
    pageRef.current.loading = true
    setLoading(true)
    let newList = pageRef.current.current === 1 ? [] : list
    HomeService.searchGoodsPage({ keyword: value, current: pageRef.current.current }).then((result) => {
      if (result.data.code == '200') {
        setTitle(value)
        setShowList(true)
        setList(newList.concat(result.data.data.records))
        setLoading(false)
        setHasMore(result.data.data.records.length === 10)
        pageRef.current.current++
      }
      pageRef.current.loading = false
    })
  }

  const setV = (e) => {
    setValue(e.detail.value)
  }

  const clearAble = () => {
    console.log(value)
    setValue('')
  }

  const anOrder = (e) => {
    if (!userStore.isBindMobile) {
      console.log(userStore.isBindMobile)
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    const l = `${H5.goodsDetail}?id=${e.id}&goodsPriceId=${e.goodsPriceId}&isRebate=${e.isRebate}&isPurchase=${e.isPurchase}&isPurchaseAdd=${e.isPurchaseAdd}&tagCity=${e.departureCity}&tapInfo=${e.goodsTypeTag}`
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
  }

  return (
    <View className='SearchPage__root'>
      <View className='home-header'>
        <View className='search-input'>
          <Image
            className='search'
            src={search}
            onClick={() => {
              pageRef.current.current = 1
              onLoad()
            }}
          />
          <Input
            className='input'
            type='text'
            onInput={setV}
            value={value}
            placeholder=''
            onConfirm={() => {
              pageRef.current.current = 1
              onLoad()
            }}
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
                <GoodsItem
                  key={item.id}
                  onItemClick={() => {
                    anOrder(item)
                  }}
                  item={item}
                />
              ))}
            </List>
          </View>
        </View>
      )}
    </View>
  )
}

export default observer(SearchPage)
