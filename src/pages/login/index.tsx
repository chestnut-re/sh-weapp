/* eslint-disable react-hooks/exhaustive-deps */
import Taro, { hideLoading, showLoading, showToast } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Image } from '@tarojs/components'
import { WXService } from '@/service/WXService'
import { useStore } from '@/store/context'
import { Button, Toast } from '@taroify/core'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'
import { save } from '@/utils/storage'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/c'

/**
 * 登录页
 */
const LoginPage = () => {
  const { userStore } = useStore()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    showLoading()
    userStore.loginIfNeed().then(() => {
      hideLoading()
    })
  }, [])
  const onGetPhoneNumberEventDetail = async (res) => {
    if (res.detail.errMsg == 'getPhoneNumber:ok') {
      showLoading()
      const result = await WXService.bindMobile(res.detail.encryptedData, res.detail.iv, userStore.sessionKey)
      hideLoading()
      console.log(result.data.code)
      if (result.data.code == 200) {
        // 成功
        Taro.reLaunch({ url: '/pages/index/index' })
        // if(result.data.data.loginVO?.accessToken){
        //   userStore.resetToken(result.data.data.loginVO)
        // }
        userStore.init()
      } else {
        showToast({ title: result.data.msg ?? '登录失败', icon: 'none', duration: 2000 })
      }
    } else if (res.detail.errMsg == 'getPhoneNumber:fail user deny') {
      console.log(res.detail)
      setOpen(true)
    }
  }

  const login = async () => {
    await userStore.init()
    Taro.reLaunch({ url: '/pages/index/index' })
  }

  console.log('userStore.isBindMobile', userStore.isBindMobile);
  

  return (
    <View className='LoginPage__root'>
      <View className='logo'>
        <Image className='img' src={pic} />
      </View>
      <View className='btn-box'>
        {!userStore.isBindMobile && (
          <Button className='btn' lang='zh_CN' openType='getPhoneNumber' onGetPhoneNumber={onGetPhoneNumberEventDetail}>
            授权手机号并登录
          </Button>
        )}
        {userStore.isBindMobile && (
          <Button className='btn' onClick={login}>
            登录
          </Button>
        )}
      </View>
      <Toast className='toast' open={open} onClose={setOpen} type='fail'>
        需要通过授权才能继续，请重新点击并授权！
      </Toast>
    </View>
  )
}

export default observer(LoginPage)
