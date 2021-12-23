import Taro from '@tarojs/taro'
import { View, Input, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { SetUpService } from '@/service/SetUpService'
import { showMToast } from '@/utils/ui'
import { Button } from '@taroify/core'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import './index.less'
/**
 * 设置密码
 */
const VerificationPage = () => {
  const { userStore } = useStore()
  console.log('验证', userStore?.phoneNumber)
  const [phone, setPhone] = useState(userStore?.phoneNumber)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)

  // const [yztime, setYztime] = useState(59)
  let yztime = 59
  const flyCode = () => {}
  const setCo = (e) => {
    setCode(e.detail.value)
  }
  useEffect(() => {
    codetimer()

    return () => {}
  }, [])
  const codetimer = () => {
    let siv = setInterval(() => {
      yztime--
      if (yztime <= -1) {
        clearInterval(siv)
        setLoading(false)
        yztime = 59
      }
    }, 1000)
  }
  const saveCode = async () => {
    const result = await SetUpService.checkValidCode(userStore?.phoneNumber, code)
    console.log(result)
    if (result.data.code === '200') {
      setShow(false)
      showMToast(result.data.msg)
      Taro.navigateTo({ url: '/pages/password/index?code=' + `${code}` })
    } else if (result.data.code === '010040') {
      showMToast(result.data.msg)
      setShow(true)
    } else {
      showMToast(result.data.msg)
    }
  }
  return (
    <View className='VerificationPage__root'>
      <View>验证码已发送到 +86 {phone}</View>
      <View className='verification'>
        <Input onInput={setCo} maxlength={10} onConfirm={saveCode} />
        <Text>{loading ? yztime + '秒' : '获取验证码'}</Text>
      </View>
      {show && <View className='f'>验证码错误</View>}
      <View>收不到验证码？</View>
      <View>发送可能会有延迟，请耐心等待； </View>
      <View>或 看一看</View>
      <View>手机号是否正确、信号是否通畅</View>
      <View onClick={flyCode}>发送验证码</View>
      {/* <Button className='btn'>完成</Button> */}
    </View>
  )
}

export default observer(VerificationPage)
