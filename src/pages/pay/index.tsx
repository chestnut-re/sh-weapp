import { useEffect, useRef, useState } from 'react'
import { showMToast } from '@/utils/ui'
import { View, Image, Text } from '@tarojs/components'
import wecat from '@/assets/img/home/wecat.png'
import shyt from '@/assets/img/home/shyt.png'
import Taro from '@tarojs/taro'

import './index.less'
/**
 * 支付页面
 */
const Pay: React.FC = () => {
  const pageRef = useRef<any>({})
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    const rawAmount = Taro.getCurrentInstance()?.router?.params?.amount ?? 0
    setAmount(Number(rawAmount))
    const data = decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.data ?? '')
    pageRef.current.data = data
    // "appId": "wx99c32486e840e570",
    // "timeStamp": "1640670788",
    // "nonceStr": "3YafjYQyuBveDr5M",
    // "packageValue": "prepay_id=wx28135308974484ca192bfae00957830000",
    // "signType": "MD5",
    // "paySign": "7F3E006ABC22C2C6D711E2672BA44A3F"

    _pay()
  }, [])

  const _pay = () => {
    const d = JSON.parse(pageRef.current.data)
    Taro.requestPayment({
      ...d,
    }).then((res) => {
      showMToast(res.errMsg)
    })
  }

  return (
    // <View>
    //   支付页面
    //   <View>金额：{amount}</View>
    //   {/* <View onClick={_pay}>支付按钮</View> */}
    // </View>
    <View className='payPage__root'>
      <View className='head'>正在跳转</View>
      <View className='native'>
        <View className='border'>
          <Image className='place' src={shyt}></Image>
        </View>
        <View className='auto'>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
        <View className='border'>
          <Image className='place' src={wecat}></Image>
        </View>
      </View>
    </View>
  )
}

export default Pay
