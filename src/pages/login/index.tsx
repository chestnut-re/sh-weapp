import Taro from '@tarojs/taro'
import { View, Text, H2 } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field} from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'

import './index.less'

const LoginPage = (props) => {
  const { commonStore } = useStore()
  const [value, setValue] = useState("")
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }

  return (
    <View className='LoginPage__root'>
        {/* <Button onClick={toFist}>Swiper Demo</Button> */}
        <View className='FirText'>登陆后开启旅程</View>
        <View className='SecText'>世界那样美好 待你游历细品</View>
        <Field
          value={value}
          placeholder='请输入手机号码'
          onChange={(e) => setValue(e.detail.value)}
        />
        <View>已阅读并同意 
            <Text>用户协议</Text>、
            <Text>隐私政策</Text>、
            <Text>买家须知</Text>及<Text>联通统一认证服务条
            </Text>
        </View>
        <Button color='primary' block>获取验证码</Button>
        <View>
            <Button  variant='text'>用密码登陆</Button>
            <Button  variant='text'>收不到验证码？</Button>
        </View>   
    </View>
  )
}

export default observer(LoginPage)