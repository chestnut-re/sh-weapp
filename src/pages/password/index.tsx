/* eslint-disable import/first */
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useStore } from '@/store/context'
import { View, Input, Text, Image } from '@tarojs/components'
import { Button } from '@taroify/core'
import { observer } from 'mobx-react'
import del from '@/assets/img/password/del.png'
import './index.less'
/**
 * 设置密码
 */
const PasswordPage = () => {
  const { userStore } = useStore()
  console.log('验证', userStore?.phoneNumber)
  const instance = getCurrentInstance()
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  const setNum = () => {
    // Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  return (
    <View className='PasswordPage__root'>
      <View className='password'>
        <View>
          <View>新密码</View>
          <Input className='name' password onInput={setNum} placeholder='8～16位数字、字母组合' maxlength={16}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <View>确认密码</View>
          <Input className='name' password placeholder='8～16位数字、字母组合' maxlength={16}></Input>
          <Image className='img' src={del} />
        </View>
      </View>

      <Button className='btn' onClick={toSetUp}>
        提交
      </Button>
    </View>
  )
}

export default observer(PasswordPage)
