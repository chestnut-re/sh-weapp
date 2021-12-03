import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'

import './index.less'
import del from '@/assets/img/password/del.png'
import pic from '@/assets/img/common/shg.png'
/**
 * 设置密码
 */
const SetPasswordPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toSetUp = () => {
    Taro.navigateTo({ url: '/pages/setUp/index' })
  }

  return (
    <View className='SetPasswordPage__root'>
      <View className='password'>
        <View>
          <View>新密码</View>
          <Input className='name' type='password' password placeholder='请输入密码' maxlength={20}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <View>确认密码</View>
          <Input className='name' type='password' password placeholder='请输入密码' maxlength={20}></Input>
          <Image className='img' src={del} />
        </View>
        <View>
          <Text>密码需为8～16位，数字、英文和符号的组合，不含空格。</Text>
        </View>
      </View>

      <Button className='btn' onClick={toSetUp}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetPasswordPage)
