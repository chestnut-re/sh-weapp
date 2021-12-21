/* eslint-disable import/first */
import { View, Input } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import Taro, { showToast } from '@tarojs/taro'
import { UserService } from '@/service/UserService'
import { observer } from 'mobx-react'
import { useState } from 'react'

import './index.less'
import { showMToast } from '@/utils/ui'
/**
 * 设置昵称
 */
const SetNamePage = () => {
  const { userStore } = useStore()
  const [inputValue, setInputValue] = useState(userStore.userInfo?.nickName)

  const getInputValue = (e) => {
    setInputValue(e.detail.value)
  }

  //修改用户信息
  const editNickName = async () => {
    const userRes = await UserService.editUserInfo({ nickName: inputValue })
    if (userRes.data.code == 200) {
      showMToast(userRes.data.msg)
      userStore.getUserInfo()
      Taro.navigateBack()
    } else {
      showMToast(userRes.data.msg)
    }
  }
  return (
    <View className='SetNamePage__root'>
      <View className='name-img'>
        <Input
          className='name'
          type='text'
          placeholder='要自游伙伴游'
          value={inputValue}
          onInput={getInputValue}
          maxlength={24}
        ></Input>
      </View>
      <Button className='btn' onClick={editNickName}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetNamePage)
