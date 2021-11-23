import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'

import './index.less'
import pic from '@/assets/img/common/shg.png'
/**
 * 设置性别
 */
const SetSexPage = (props) => {
  const { commonStore } = useStore()
  const [showMan, setShowMan] = useState('block')
  const [showWomen, setShowWomen] = useState('none')

  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const selectSex1 = () => {
    setShowMan('block')
    setShowWomen('none')
  }
  const selectSex2 = () => {
    setShowMan('none')
    setShowWomen('block')
  }
  return (
    <View className='SetSexPage__root'>
      <View className='sex-list'>
        <View className='item' onClick={selectSex1}>
          <View>男</View>
          <Image className='img' src={pic} style={{ display: showMan }} />
        </View>
        <View className='divide' />
        <View className='item' onClick={selectSex2}>
          <View>女</View>
          <Image className='img' src={pic} style={{ display: showWomen }} />
        </View>
      </View>

      <Button className='btn' onClick={toMyData}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetSexPage)
