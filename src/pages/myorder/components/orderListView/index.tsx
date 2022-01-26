import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { H5 } from '@/constants/h5'
import './index.less'
import { getPrice } from '@/utils/price'
/**
 * 我的订单
 */
const OrderListPage = ({ por }) => {
  const toOrderDetail = (state, id) => {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(`${H5.orderDetail}?type=${state}&orderId=${id}`)}`,
    })
  }

  const toPersonalBind = (item) => {
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(`${H5.personalBind}?id=${item.id}&orderId=${item.goodsId}`)}`,
    })
  }

  const onBuyAgain = (e) => {
    const l = `${H5.submitOrder}?id=${e.goodsId}&source=${e.source}`
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(l)}` })
  }

  const orderState = (state) => {
    switch (state) {
      case 1:
        return '待付款'
        break
      case 2:
        return '已失效'
        break
      case 3:
        return '待核销'
        break
      case 4:
        return '已完成'
        break
      case 5:
        return '退款中'
        break
      case 6:
        return '退款成功'
        break
      default:
        return '退款失败'
    }
  }

  const refundState = (state) => {
    switch (state) {
      case 1:
        return '退款中'
        break
      case 2:
        return '退款成功'
        break
      case 3:
        return '退款失败'
        break
      default:
        return '退款失败'
    }
  }
  return (
    <View className='all'>
      {por.length > 0 && por.map((item, index) => (
        <View className='item' key={item.id}>
          <View className='card'>
            <View onClick={() => toOrderDetail(item.state, item.id)}>
              <View className='state'>
                {orderState(item.state)}
              </View>
              <View className='content'>
                <Image className='img' src={item.promotionalImageUrl} />
                <View className='name'>
                  {item.goodsName}
                  <View className='small-name'>
                    <View>
                      {item.travelStartDate}出发 -- {item.travelEndDate}返程
                    </View>
                    <View>
                      成人X{item.adultNum} 儿童X{item.childNum}
                    </View>
                  </View>
                  {item.refundNumDtoList && item.refundNumDtoList.length > 0 && (
                    <View className='refundInfoView'>
                      {
                        item.refundNumDtoList.map((refundItem, refundIndex) => (
                          <View key={`index${refundIndex}`}>
                            {refundItem.adultNum > 0 && (
                              <View className='refundInfoItem'>
                                <View className='txt'>成人X{refundItem.adultNum}</View>
                                <View className={`btn btnColor${refundItem.refundState}`}>{refundState(refundItem.refundState)}</View>
                              </View>
                            )}
                            {
                              refundItem.childNum > 0 && (
                                <View className='refundInfoItem'>
                                  <View className='txt'>儿童X{refundItem.childNum}</View>
                                  <View className={`btn btnColor${refundItem.refundState}`}>{refundState(refundItem.refundState)}</View>
                                </View>
                              )
                            }
                          </View>
                        ))
                      }
                    </View>
                  )}

                </View>
              </View>
              <View className='price'>
                <View className='discount'>已优惠 <Text className='money'>¥{getPrice(item.discountAmount, 2)}</Text></View>
                <View>
                  共计 ¥{getPrice(item.payAmount, 2)}
                </View>
              </View>

            </View>

            {item.state == 1 && (
              <View className='message'>
                {/* <View className='message-one'>咨询</View> */}
                <View className='message-two' onClick={() => toOrderDetail(item.state, item.id)}>
                  去付款
                </View>
              </View>
            )}
            {item.state == 2 && (
              <View className='message'>
                {/* <View className='message-one'>咨询</View> */}
                <View className='message-two' onClick={() => toOrderDetail(item.state, item.id)}>
                  去付款
                </View>
              </View>
            )}

            {item.state == 3 && (
              <View className='message'>
                {/* <View className='message-one'>咨询</View> */}
                <View onClick={() => { onBuyAgain(item) }} className='message-one'>再次购买</View>
                {item.updateType == 0 && <View onClick={() => { toPersonalBind(item) }} className='message-two'>填写出行人信息</View>}
              </View>
            )}

            {item.state == 4 && (
              <View className='message'>
                <View onClick={() => { onBuyAgain(item) }} className='message-one'>再次购买</View>
                {/* <View className='message-one'>分享给TA</View> */}
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}

export default observer(OrderListPage)
