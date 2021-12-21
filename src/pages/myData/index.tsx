/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Picker } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Image, Popup, DatetimePicker, ActionSheet } from '@taroify/core'
import pic from '@/assets/img/common/shg.png'
import jump from '@/assets/img/yjfk/jump.png'
import { showMToast } from '@/utils/ui'
import { UserService } from '@/service/UserService'
import { LocationService } from '@/service/LocationService'
import { now } from '@/utils/time'
import { observer } from 'mobx-react'
import './index.less'
import { filterCurDate, getMyDate } from '@/utils/date'
/**
 * 个人信息
 */
const MyDataPage = () => {
  const { userStore } = useStore()
  console.log(userStore)

  const [value, setValue] = useState('')
  const [openPicker, setOpenPicker] = useState(false)

  const [openDate, setOpenDate] = useState(false)
  const [minDate] = useState(new Date(1970, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [defaultValue] = useState(new Date(2021, 0, 17))
  const toSetName = () => {
    Taro.navigateTo({ url: '/pages/setName/index' })
  }
  const toSetSex = () => {
    Taro.navigateTo({ url: '/pages/setSex/index' })
  }
  const toSetAutograph = () => {
    Taro.navigateTo({ url: '/pages/setAutograph/index' })
  }
  //修改生日
  const editBirthday = async (e) => {
    let birthday = getMyDate(e)
    const userRes = await UserService.editUserInfo({ birthday: birthday })
    console.log('修改返回参数', userRes)
    if (userRes.data.code == 200) {
      showMToast(userRes.data.msg)
      userStore.getUserInfo()
      Taro.navigateBack()
    } else {
      showMToast(userRes.data.msg)
    }
  }
  //获取城市列表
  const getAreaList = async () => {
    const result = await LocationService.getAreaList()
    console.log(result)
    // if (result.statusCode === 200) {
    //   setBannerList(result.data.data)
    // }
  }
  const selector = ['美国', '中国', '巴西', '日本']
  const [selectorChecked, setSelectorChecked] = useState('美国')
  const onChange = (e) => {
    setSelectorChecked(selector[e.detail.value])
  }
  return (
    <View className='MyDataPage__root'>
      <Popup open={openPicker} rounded placement='bottom' onClose={setOpenPicker}>
        <View>
          <Picker mode='selector' range={selector} onChange={onChange}>
            <View className='picker'>当前选择：{selectorChecked}</View>
          </Picker>
        </View>
      </Popup>
      <ActionSheet open={openDate} onSelect={() => setOpenDate(false)} onClose={setOpenDate}>
        <DatetimePicker type='date' min={minDate} max={maxDate} onConfirm={(value) => editBirthday(value)}>
          <DatetimePicker.Toolbar>
            <DatetimePicker.Button>取消</DatetimePicker.Button>
            <DatetimePicker.Title>选择日期</DatetimePicker.Title>
            <DatetimePicker.Button>确认</DatetimePicker.Button>
          </DatetimePicker.Toolbar>
        </DatetimePicker>
      </ActionSheet>
      <View className='data-list'>
        <View className='data-img'>
          <View className='item-left'>头像</View>
          <View className='item-right'>
            <Image className='img' src={userStore.userInfo?.pic ? userStore.userInfo?.pic : pic}></Image>
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetName}>
          <View className='item-left'>昵称</View>
          <View className='item-right'>
            {userStore.userInfo?.nickName}
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetSex}>
          <View className='item-left'>性别</View>
          <View className='item-right'>
            {userStore.userInfo?.sex}
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={() => setOpenDate(true)}>
          <View className='item-left'>生日</View>
          <View className='item-right'>
            {filterCurDate(userStore.userInfo?.birthday)}
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={getAreaList}>
          <View className='item-left'>常住地</View>
          <View className='item-right'>
            {userStore.userInfo?.address}
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
        <View className='divide' />
        <View className='item' onClick={toSetAutograph}>
          <View className='item-left'>签名</View>
          <View className='item-right'>
            {userStore.userInfo?.personalSignature}
            <Image className='img-left' src={jump}></Image>
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(MyDataPage)
