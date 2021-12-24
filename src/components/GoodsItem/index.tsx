import React, { useState } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import noLike from '@/assets/img/home/no-like.png'
import liked from '@/assets/img/home/liked.png'

import './index.less'

interface Props {
  onItemClick: () => void
  item: any
}

/**
 * GoodsItem 商品Item
 */
const GoodsItem: React.FC<Props> = ({ item, onItemClick }) => {
  const _itemClick = () => {
    onItemClick()
  }

  return (
    <View className='GoodsItem__root' key={item.id} onClick={_itemClick}>
      <View className='card'>
        <View className='big-img'>
          <Image className='big' src={item.promotionalImageUrl} />
          <View className='label'>
            <View className='label-pic'>{item.departureCity}</View>
            <View className='text'>{item.goodsNickName}</View>
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
  )
}

export default GoodsItem