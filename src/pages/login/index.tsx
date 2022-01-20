import Taro, { hideLoading, showLoading, showToast } from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { WXService } from '@/service/WXService'
import { commonStore, useStore } from '@/store/context'
import { Button, Toast } from '@taroify/core'
import { observer } from 'mobx-react'
import back from '@/assets/img/yjfk/back.png'
import pic from '@/assets/img/common/login2.png'
import checked from '@/assets/img/login/checked.png'
import uncheck from '@/assets/img/login/uncheck.png'
import { H5 } from '@/constants/h5'
import NavBar from '@/components/navbar'
import { getUrlParams } from '@/utils/webviewUtils'


import { UserService } from '@/service/UserService'
import './index.less'



/**
 * 登录页
 */
const LoginPage = () => {
  const { userStore } = useStore()
  const [open, setOpen] = useState(false)
  const [openProtocol, setOpenProtocol] = useState(false)
  const [selectProtocol, setSelectProtocol] = useState(false)
  const [wxCode, setWxCode] = useState('')

  useEffect(() => {
    Taro.login().then(wxRes => {
      setWxCode(wxRes.code)
    })
  }, [])


  const onLinkProtocol = (e, type) => {
    e.stopPropagation();
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5[type]}` })
  }

  /**
   * 微信授权登录
   */

  const wxAuthorizeLogin = async (res) => {
    if (res.detail.errMsg == 'getPhoneNumber:ok') {
      showLoading()
      const result = await userStore.login(res.detail.encryptedData, res.detail.iv, wxCode)
      hideLoading()
      const params = Taro.getCurrentInstance()?.router?.params as any
      const urlParams = getUrlParams(decodeURIComponent(params.url))

      if (result.code == 200) {
        if (commonStore.bizId) {
          UserService.bindBizUser(commonStore.bizId).then((bindRes) => {
            commonStore.bizId = null
            console.log(`bind result: ${JSON.stringify(bindRes)}`)
          })
        }

        if (commonStore.afterLoginCallback) {
          commonStore.afterLoginCallback()
          commonStore.removeAfterLoginCallback()
        }
        /**
         * 判断是否h5页面
         */

        if (params.from == 'web') {
          if (urlParams.rebateType == '2' && result.data.userDetails.isBindMobile == 0) {
            const beanParams = {
              recommendId: urlParams.userId,
              taskId: urlParams.taskId
            }
            UserService.unLockPullBean(beanParams).then(resBean => {
              console.log('123133434', resBean)
            })
          }
          Taro.redirectTo({ url: `/pages/webview/index?url=${params.url}` })
        } else {
          Taro.switchTab({ url: '/pages/home/index' })
        }
      } else {
        showToast({ title: result.msg ?? '登录失败', icon: 'none', duration: 2000 })
      }
    } else if (res.detail.errMsg == 'getPhoneNumber:fail user deny') {
      console.log(res.detail)
      setOpen(true)
    }
  }

  const onBack = () => {
    Taro.switchTab({ url: '/pages/home/index' })
  }

  return (
    <View className='LoginPage__root'>
      <NavBar className='loginNav'>
        <View className='loginNav-body'>
          <View className='back' onClick={() => onBack()}>
            <Image className='img' src={back} />
          </View>
        </View>
      </NavBar>
      <View className='bg'></View>
      <View className='logo'>
        <Image className='img' src={pic} />
      </View>
      <View className='login'>
        <View className='text-one'>登录后开启旅程</View>
        <View className='text-two'>世界那样美好 待你游历细品</View>
      </View>
      <View className='btn-box'>
        <Button className='btn' lang='zh_CN' openType='getPhoneNumber' onGetPhoneNumber={wxAuthorizeLogin}>
          授权登录
        </Button>
        {/* <Button className='btn' onClick={login}>
          登录
        </Button> */}
        {/* {!userStore.isBindMobile && (
          <Button className='btn' lang='zh_CN' openType='getPhoneNumber' onGetPhoneNumber={wxAuthorizeLogin}>
            授权登录
          </Button>
        )} */}
        {/* {userStore.isBindMobile && (
          <Button className='btn' onClick={login}>
            登录
          </Button>
        )} */}
      </View>
      <View
        onClick={() => {
          setSelectProtocol(!selectProtocol)
        }}
        className='protocol'
      >
        <View className='check'>
          {
            selectProtocol ? (
              <Image className='img' src={checked} />
            ) : (
              <Image className='img' src={uncheck} />
            )
          }
        </View>
        <View className='protocolName'>
          <View className='txt'>
            登录表示你已同意
            <View onClick={(e) => { onLinkProtocol(e, 'service') }} className='txt highlight'>用户协议、</View>
            <View onClick={(e) => { onLinkProtocol(e, 'privacy') }} className='txt highlight'>隐私政策</View>
          </View>
        </View>
      </View>
      <Toast className='toast' open={open} onClose={setOpen} type='fail'>
        需要通过授权才能继续，请重新点击并授权！
      </Toast>
      <Toast className='toast' open={openProtocol} onClose={setOpenProtocol} type='fail'>
        请同意用户协议
      </Toast>
    </View>
  )
}

export default observer(LoginPage)
