import React, { useEffect, useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'
import Img from '@/components/Img'
import { commonStore, useStore } from '@/store/context'
import Taro from '@tarojs/taro' // Taro 专有 Hooks
import { LikeService } from '@/service/Like'
import { getIntPrice } from '@/utils/price'

import './index.less'

interface Props {
  onItemClick: () => void
  item: any
}

/**
 * GoodsItem 商品Item
 */
const GoodsItem: React.FC<Props> = ({ item, onItemClick }) => {
  const { userStore, homeStore } = useStore()

  const [love, setLove] = useState(null) as any
  const [myLikesNum, setMyLikesNum] = useState(0) as any

  useEffect(() => {
    setLove(item.isLike == 1)
    setMyLikesNum(item.shamLikes)
  }, [item])
  const _itemClick = () => {
    onItemClick()
  }

  const likeClick = (e) => {
    e.stopPropagation()
    if (!userStore.isBindMobile) {
      // 未登录
      Taro.navigateTo({ url: '/pages/login/index' })
      return
    }
    const params = {} as any
    params.goodsId = item.id
    params.state = love == 1 ? 0 : 1
    LikeService.like(params).then((res) => {
      const { data } = res.data
      if (data) {
        setMyLikesNum(love ? myLikesNum - 1 : myLikesNum + 1)
        setLove(!love)
        userStore.likeCount()
      }
    })
  }

  return (
    <View className='GoodsItem__root' key={item.id} onClick={_itemClick}>
      <View className='card'>
        <View className='big-img'>
          <Img
            url={item.promotionalImageUrl}
            className='big'
          />
          <View className='label'>
            <View className='label-pic'>{item.departureCity}</View>
            <View className='text'>{item.goodsTypeTag}</View>
          </View>
        </View>
        <View className='content'>
          <View className='text'>{item.goodsName}</View>
          <View className='money'><Text className='rmbIcon'>¥</Text>{getIntPrice(item.personCurrentPrice, 2)}</View>
          <View className='consume'>
            <Text>{item.shamSales}人已付款</Text>
            <View className='likeView' onClick={likeClick}>
              <Image className='is-like' src={love ? liked : noLike} />
              {myLikesNum}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default GoodsItem
