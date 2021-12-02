import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button, Image, Dialog } from '@taroify/core'
import { observer } from 'mobx-react'
import { useRef, useState } from 'react'
import pic from '@/assets/img/common/shg.png'
import jump from '@/assets/img/yjfk/jump.png'

import './index.less'

/**
 * 设置页
 */
const SetUpPage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('20.32Mb')
  const toFist = () => {
    Taro.navigateBack()
  }
  const toAboutUs = () => {
    Taro.navigateTo({ url: '/pages/aboutUs/index' })
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const toSetPassword = () => {
    Taro.navigateTo({ url: '/pages/setPassword/index' })
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
        <Image className='img' src={pic}></Image>
        <View className='massage'>
          <View className='name'>丛林迷雾2</View>
          <View className='autograph'>签名： 天空分外晴朗，白云也绽放笑容</View>
          <View className='address'>常住地： 北京市海淀区</View>
        </View>
      </View>
      <View className='password' onClick={toSetPassword}>
        <View className='password-left'>登陆密码</View>
        <View className='password-right'>
          去设置
          <View className='password-left'>
            <Image className='jump' src={jump}></Image>
          </View>
        </View>
      </View>
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
      <Button className='btn' onClick={toFist}>
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
