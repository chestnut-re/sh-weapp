import Taro from '@tarojs/taro'
import { View, Input, Text, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'

import { observer } from 'mobx-react'

import './index.less'
import pic from '@/assets/img/common/shg.png'
/**
 * 设置昵称
 */
const SetNamePage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toMyData = () => {
    Taro.navigateTo({ url: '/pages/myData/index' })
  }

  return (
    <View className='SetNamePage__root'>
      <View className='name-img'>
        <Input className='name' type='text' placeholder='要自游伙伴游' focus maxlength={24}></Input>
        <Image className='img' src={pic} />
      </View>
      <Button className='btn' onClick={toMyData}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetNamePage)
