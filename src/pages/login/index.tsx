import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Field } from '@taroify/core'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'

import './index.less'

const LoginPage = (props) => {
  const { commonStore } = useStore()

  useEffect(() => {
    Taro.login().then((res) => {
      console.log(res)
    })
  }, [])

  const getUserInfo = async () => {
    let res = await Taro.getUserProfile({
      desc: '用于完善会员资料',
    })
    console.log(res)
    // const sessionKey = await get(SESSION_KEY)
    // wx.decryptUserInfo(res.encryptedData, res.iv, sessionKey.data).then((res2) => {
    // })
    // gender 性别 0：未知、1：男、2：女
    // this.userInfoWX = res.userInfo
  }

  const onGetPhoneNumberEventDetail = async (res) => {
    console.log(res)
    if (!res.detail.encryptedData) {
      // 手机号授权失败, 推到第一步授权
      return
    }
    // const sessionKey = await get(SESSION_KEY)
    // const phoneRes = await wx.decryptUserInfo(res.detail.encryptedData, res.detail.iv, sessionKey.data)
    // await save(PHONE_NUMBER, phoneRes.data.phoneNumber)
    // 获取真实姓名
  }

  return (
    <View className='LoginPage__root'>
      <Button color='primary' block>
        获取验证码
      </Button>
      <Button className='btn' onClick={getUserInfo}>
        <Text>授权用户信息</Text>
      </Button>

      <Button className='btn' lang='zh_CN' openType='getPhoneNumber' onGetPhoneNumber={onGetPhoneNumberEventDetail}>
        授权手机号
      </Button>
    </View>
  )
}

export default observer(LoginPage)
