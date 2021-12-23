import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Image, Dialog } from '@taroify/core'
import { observer } from 'mobx-react'
import { useState } from 'react'
import myPhoto from '@/assets/img/mine/myphoto.png'
import jump from '@/assets/img/yjfk/jump.png'

import './index.less'

/**
 * 设置页面
 */
const SetUpPage = () => {
  const { userStore } = useStore()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('20.32Mb')

  /**退出登录并回到首页 */
  const _logout = () => {
    userStore.loginOut()
  }
  const toAboutUs = () => {
    Taro.navigateTo({ url: '/pages/aboutUs/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const toPassword = () => {
    Taro.navigateTo({ url: '/pages/password/index' })
  }
  const toFeedBack = () => {
    Taro.navigateTo({ url: '/pages/feedBack/index' })
  }
  const clear = () => {
    setValue('')
    setOpen(false)
  }
  return (
    <View className='SetUpPage__root'>
      <View className='user' onClick={toMyData}>
        <Image className='img' src={userStore.userInfo?.pic ? userStore.userInfo?.pic : myPhoto}></Image>
        <View className='massage'>
          <View className='name'>{userStore.userInfo?.nickName ? userStore.userInfo?.nickName : '留个名吧'}</View>
          <View className='autograph'>
            签名：{' '}
            {userStore.userInfo?.personalSignature
              ? userStore.userInfo?.personalSignature
              : '天空分外晴朗，白云也绽放笑容'}
          </View>
          <View className='address'>常住地： {userStore.userInfo?.address}</View>
        </View>
      </View>
      {/* <View className='password' onClick={toPassword}>
        <View className='password-left'>登陆密码</View>
        <View className='password-right'>
          去设置
          <View className='password-left'>
            <Image className='jump' src={jump}></Image>
          </View>
        </View>
      </View> */}
      <View className='content-list'>
        <View className='content' onClick={toFeedBack}>
          <View className='content-left'>意见反馈</View>
          <View className='content-right'>
            来告诉我们你的想法吧
            <View className='content-left'>
              <Image className='jump' src={jump}></Image>
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='content' onClick={() => setOpen(true)}>
          <View className='content-left'>清除缓存</View>
          <View className='content-right'>
            {value}
            <View className='content-left'>
              <Image className='jump' src={jump}></Image>
            </View>
          </View>
        </View>
        <View className='divide' />
        <View className='content' onClick={toAboutUs}>
          <View className='content-left'>关于我们</View>
          <View className='content-right'>
            <View className='content-left'>
              <Image className='jump' src={jump}></Image>
            </View>
          </View>
        </View>
      </View>
      <Button className='btn' onClick={_logout}>
        退出当前账号
      </Button>
      {/* <Button onClick={toLogin}>Go to Login</Button> */}
      {/* <Button color='primary'>主要按钮</Button> */}
      <Dialog className='dialog' open={open} onClose={setOpen}>
        <Dialog.Content>将清除{value}缓存数据</Dialog.Content>
        <Dialog.Actions theme='round'>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={clear}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

export default observer(SetUpPage)
