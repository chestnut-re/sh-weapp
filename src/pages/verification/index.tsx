import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'
import { useState } from 'react'
import './index.less'
import del from '@/assets/img/password/del.png'
import pic from '@/assets/img/common/shg.png'
/**
 * 设置密码
 */
const VerificationPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)
  const [phone, SetPhone] = useState('166 1234 0000')
  const toFist = () => {
    Taro.navigateBack()
  }
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }

  return (
    <View className='VerificationPage__root'>
      <View>验证码已发送到 +86 {phone}</View>
      <View className='verification'>
        <Input></Input>
        <Text>32秒后重发</Text>
      </View>
      <View className='f'>验证码错误</View>
      <View>收不到验证码？</View>
      <View>发送可能会有延迟，请耐心等待； </View>
      <View>或 看一看</View>
      <View>手机号是否正确、信号是否通畅</View>

      <Button className='btn'>完成</Button>
    </View>
  )
}

export default observer(VerificationPage)
