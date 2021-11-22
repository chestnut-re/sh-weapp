import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { BullhornOutlined, SettingOutlined, Scan, Manager, InfoOutlined, Points } from '@taroify/icons'
import { observer } from 'mobx-react'

import './index.less'

const MinePage = (props) => {
  const { commonStore } = useStore()
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/index' })
  }

  return (
    <View className='MinePage__root'>
      <View className='Header__btn'>
        <View className='btn' onClick={toFist}>
          <BullhornOutlined size='20' />
        </View>
        <View className='btn' onClick={toLogin}>
          <Scan size='20' />
        </View>
        <View className='btn'>
          <SettingOutlined size='20' />
        </View>
      </View>
      <View className='user'>
        <View className='User__Img'>
          <Manager size='50' />
        </View>
        <View className='User__Name'>
          <Text className='name'>丛林迷雾</Text>
          <Text className='autograph'>天空分外晴朗,白云也绽露笑容</Text>
        </View>
      </View>
      <View className='dolor'>
        <View className='details'>
          <InfoOutlined size='20' style={{ color: '#fff' }} />
        </View>
        <View className='token'>
          <View className='Token__Img'>
            <Points size='50' style={{ color: '#fff' }} />
          </View>
          <Text className='Token__Num'>2800</Text>
        </View>
      </View>
      <View className='card'>
        <View className='Card__Item'>浏览</View>
        <View className='Card__Item'>点赞</View>
      </View>
    </View>
  )
}

export default observer(MinePage)
