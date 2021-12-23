/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { useStore } from '@/store/context'
import { View, Input, Text, Image } from '@tarojs/components'
import { Button } from '@taroify/core'
import { observer } from 'mobx-react'
import { useState } from 'react'
import { SetUpService } from '@/service/SetUpService'
import { showMToast } from '@/utils/ui'
import './index.less'
/**
 * 重置密码
 */
const ResetPasswordPage = () => {
  const { userStore } = useStore()
  console.log('验证', userStore?.phoneNumber)
  const [text, setText] = useState('')
  const toSetUp = async () => {
    console.log(text)
    // Taro.navigateTo({ url: '/pages/verification/index' })
    const result = await SetUpService.sendValidCode(text)
    if (result.statusCode === 200) {
      showMToast(result.data.msg)
      Taro.navigateTo({ url: '/pages/verification/index' })
    }
  }
  const getInput = (e) => {
    setText(e.detail.value)
  }
  return (
    <View className='ResetPasswordPage__root'>
      <View>
        <View className='text'>重置密码</View>
        <View>
          <Input className='name' type='number' placeholder='' onInput={getInput} maxlength={11}></Input>
        </View>
      </View>

      <Button className='btn' onClick={toSetUp}>
        获取验证码
      </Button>
    </View>
  )
}

export default observer(ResetPasswordPage)
