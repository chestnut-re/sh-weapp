import { View, Image } from '@tarojs/components'
import { WXService } from '@/service/wx'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'
import Taro, { showToast } from '@tarojs/taro'

/**
 * 登录页
 */
const LoginPage = (props) => {
  const { userStore } = useStore()

  const onGetPhoneNumberEventDetail = async (res) => {
    console.log(res)
    const result = await WXService.bindMobile(res.detail.encryptedData, res.detail.iv, userStore.sessionKey)
    if (result.data.code == 200) {
      // 成功
      Taro.reLaunch({ url: '/pages/index/index' })
    } else {
      showToast(result.data.msg ?? '登录失败')
    }
  }

  return (
    <View className='LoginPage__root'>
      <View className='logo'>
        <Image className='img' src={pic} />
      </View>
      <View className='btn-box'>
        <Button className='btn' lang='zh_CN' openType='getPhoneNumber' onGetPhoneNumber={onGetPhoneNumberEventDetail}>
          授权手机号并登录
        </Button>
      </View>
    </View>
  )
}

export default observer(LoginPage)
