/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'

import './index.less'
import del from '@/assets/img/password/del.png'
/**
 * 修改密码
 */
const SetPasswordPage = () => {
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }
  const toVerification = () => {
    Taro.navigateTo({ url: '/pages/verification/index' })
  }
  return (
    <View className='SetPasswordPage__root'>
      <View className='password'>
        <View className='name-img'>
          <View>当前密码</View>
          <Input className='name' password placeholder='请输入密码' maxlength={20}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <View>新密码</View>
          <Input className='name' password placeholder='请输入密码' maxlength={20}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <View>确认密码</View>
          <Input className='name' password placeholder='请输入密码' maxlength={20}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <Text>密码需为8～16位，数字、英文和符号的组合，不含空格。</Text>
        </View>
      </View>
      <View className='update' onClick={toVerification}>
        短信验证修改
      </View>

      <Button className='btn' onClick={toSetUp}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetPasswordPage)
