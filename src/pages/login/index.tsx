import { View, Image } from '@tarojs/components'
import { WXService } from '@/service/wx'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { observer } from 'mobx-react'
import pic from '@/assets/img/common/shg.png'
import './index.less'

/**
 * 登录页
 */
const LoginPage = (props) => {
  const { userStore } = useStore()

  const onGetPhoneNumberEventDetail = async (res) => {
    console.log(res)
    const result = await WXService.bindMobile(res.detail.encryptedData, res.detail.iv, userStore.sessionKey)
    // await save(PHONE_NUMBER, phoneRes.data.phoneNumber)
    // 获取真实姓名
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
