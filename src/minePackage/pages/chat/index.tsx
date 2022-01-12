import { View } from '@tarojs/components'
import Taro, { usePageScroll } from '@tarojs/taro'
import { useState, useRef, useEffect } from 'react'

// import ChatView from '@/msgPages/components/chatView'
import { imToken, sendMsg } from './../../utils/MsgTools'

import './index.less'

const ChatPage = () => {
  useEffect(() => {

    const { router } = Taro.getCurrentInstance()
    Taro.setNavigationBarTitle({
      title: router?.params.title || '聊天'
    })
    console.log('router router router', router?.params)
    let loginParams = {
      user: 'a1468472781296582656',
      token: 'YWMtaxRnRl8XEeyz_kE8vEG8dbHZduk1dUT5tPMC1OoE2Sb-btAgV_IR7KjeP0NixiEgAwMAAAF9x5ypPgWP1AA2PLw2e3mVC87p7HUDC4fyLTyTF4NDLAyHpOS65UEoSw',
    }
    imToken(loginParams)
  }, [])

  const onPoshMsg = () => {
    console.log('12312312312')
    sendMsg('123123', 'a1468472781296582656', (res) => {
      console.log('resres', res)
    })
  }


  return (
    <View className='ChatPage__root'>
      {/* <ChatView /> */}
      <View onClick={onPoshMsg}>发送消息</View>
    </View>
  )
}

export default ChatPage