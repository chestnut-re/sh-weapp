/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { Button } from '@taroify/core'
import { useStore } from '@/store/context'
import { UserService } from '@/service/UserService'
import { showMToast } from '@/utils/ui'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import select from '@/assets/img/mine/select.png'

import './index.less'
/**
 * 设置性别
 */
const SetSexPage = () => {
  const { userStore } = useStore()
  const [showMan, setShowMan] = useState('block')
  const [showWomen, setShowWomen] = useState('none')
  const [selected, setSelected] = useState(userStore.userInfo?.sex)
  useEffect(() => {
    if (userStore.userInfo?.sex == '男') {
      setShowMan('block')
      setShowWomen('none')
    } else {
      setShowMan('none')
      setShowWomen('block')
    }
  }, [])
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const selectSex1 = () => {
    setShowMan('block')
    setShowWomen('none')
    setSelected('男')
  }
  const selectSex2 = () => {
    setShowMan('none')
    setShowWomen('block')
    setSelected('女')
  }
  //修改用户信息
  const editSex = async () => {
    const userRes = await UserService.editUserInfo({ sex: selected })
    if (userRes.data.code == 200) {
      showMToast(userRes.data.msg)
      userStore.getUserInfo()
      Taro.navigateBack()
    } else {
      showMToast(userRes.data.msg)
    }
  }
  return (
    <View className='SetSexPage__root'>
      <View className='sex-list'>
        <View className='item' onClick={selectSex1}>
          <View>男</View>
          <Image className='img' src={select} style={{ display: showMan }} />
        </View>
        <View className='divide' />
        <View className='item' onClick={selectSex2}>
          <View>女</View>
          <Image className='img' src={select} style={{ display: showWomen }} />
        </View>
      </View>

      <Button className='btn' onClick={editSex}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetSexPage)
