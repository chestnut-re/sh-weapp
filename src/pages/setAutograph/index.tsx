import Taro from '@tarojs/taro'
import { View, Textarea } from '@tarojs/components'
import { Button } from '@taroify/core'
import { useStore } from '@/store/context'
import { useState } from 'react'
import { UserService } from '@/service/UserService'
import { showMToast } from '@/utils/ui'
import { observer } from 'mobx-react'
import './index.less'

/**
 * 设置签名
 */
const SetAutographPage = () => {
  const { userStore } = useStore()
  const [inputValue, setInputValue] = useState(userStore.userInfo?.personalSignature)

  const onInputValue = (e) => {
    setInputValue(e.detail.value)
  }

  //修改用户信息
  const editUserInfo = async () => {
    const userRes = await UserService.editUserInfo({ personalSignature: inputValue })
    console.log('修改返回参数', userRes)
    if (userRes.data.code == 200) {
      showMToast(userRes.data.msg)
      userStore.getUserInfo()
      Taro.navigateBack()
    } else {
      showMToast(userRes.data.msg)
    }
  }

  return (
    <View className='SetAutographPage__root'>
      <View className='name-img'>
        <Textarea
          className='name'
          placeholder='请输入您想表达的内容'
          value={inputValue}
          onInput={onInputValue}
          maxlength={400}
        />
      </View>
      <Button
        className='btn'
        onClick={() => {
          editUserInfo()
        }}
      >
        完成
      </Button>
    </View>
  )
}

export default observer(SetAutographPage)
