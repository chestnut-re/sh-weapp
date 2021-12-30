import { showMToast } from '@/utils/ui'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useRef, useState } from 'react'

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
    <View>
      支付页面
      <View>金额：{amount}</View>
      {/* <View onClick={_pay}>支付按钮</View> */}
    </View>
  )
}

export default Pay
