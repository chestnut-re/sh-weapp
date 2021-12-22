/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, Picker } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Image, Popup, DatetimePicker, ActionSheet } from '@taroify/core'
import { filterCurDate, getMyDate } from '@/utils/date'
import { showMToast } from '@/utils/ui'
import { UserService } from '@/service/UserService'
import { observer } from 'mobx-react'
import jump from '@/assets/img/yjfk/jump.png'
import myPhoto from '@/assets/img/mine/myphoto.png'
import './index.less'
/**
 * 个人信息
 */
const MyDataPage = () => {
  const { userStore } = useStore()

  const [openDate, setOpenDate] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [minDate] = useState(new Date(1970, 0, 1))
  const [maxDate] = useState(new Date(2025, 10, 1))
  const [defaultValue] = useState(new Date(2021, 0, 17))
  const toSetName = () => {
    Taro.navigateTo({ url: '/pages/setName/index' })
  }
  const toSetPic = () => {
    Taro.navigateTo({ url: '/pages/setPic/index' })
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

  const [address, setAddress] = useState('请选择地址')
  //三级联动
  const [customArray, setCustomArray] = useState<any>(userStore?.cityInfo)
  const [customIndex, setCustomIndex] = useState([0, 0, 0])
  let [onlyArray, setOnlyArray] = useState([[], [], []])
  useEffect(() => {
    const data = {
      customArray: customArray,
      customIndex: customIndex,
      onlyArray: onlyArray,
    }
    for (let i = 0; i < data.customArray.length; i++) {
      // @ts-ignore
      data.onlyArray[0].push(customArray[i].name)
    }
    for (let j = 0; j < data.customArray[customIndex[0]].areas.length; j++) {
      // @ts-ignore
      data.onlyArray[1].push(customArray[customIndex[0]].areas[j].name)
    }
    for (let k = 0; k < customArray[customIndex[0]].areas[customIndex[1]].areas.length; k++) {
      // @ts-ignore
      data.onlyArray[2].push(customArray[customIndex[0]].areas[customIndex[1]].areas[k].name)
    }
    setCustomArray(data.customArray)
    setCustomIndex(data.customIndex)
    setOnlyArray(data.onlyArray)
  })
  //多列选择
  const bindCustomPickerColumnChange = (m) => {
    const newCustomArray = userStore?.cityInfo
    const newCustomIndex = customIndex
    const newOnlyArray = onlyArray
    newCustomIndex[m.detail.column] = m.detail.value
    console.log(newCustomIndex)
    const searchColumn = () => {
      for (let i = 0; i < newCustomArray.length; i++) {
        let arr1 = []
        let arr2 = []
        if (i == newCustomIndex[0]) {
          for (let j = 0; j < newCustomArray[i].areas.length; j++) {
            // @ts-ignore
            arr1.push(newCustomArray[i].areas[j].name)
            if (j == newCustomIndex[1]) {
              for (let k = 0; k < newCustomArray[i].areas[j].areas.length; k++) {
                // @ts-ignore
                arr2.push(newCustomArray[i].areas[j].areas[k].name)
              }
              newOnlyArray[2] = arr2
              console.log('arr2', arr2)
            }
          }
          newOnlyArray[1] = arr1
          console.log('arr1', arr1)
        }
      }
    }

    switch (m.detail.column) {
      case 0:
        newCustomIndex[1] = 0
        newCustomIndex[2] = 0
        searchColumn()
        break
      case 1:
        newCustomIndex[2] = 0
        searchColumn()
        break
    }
    //这里要清空原来的数据进行数据更新
    setOnlyArray([[], [], []])
    setCustomIndex(newCustomIndex)
    console.log(newCustomIndex)
  }

  //选择地区
  const addressOnChange = async (e) => {
    const indexArr = e.detail.value
    console.log(
      customArray[indexArr[0]].name,
      customArray[indexArr[0]].areas[indexArr[1]].name,
      customArray[indexArr[0]].areas[indexArr[1]].areas[indexArr[2]].name
    )

    const addressText =
      `${customArray[indexArr[0]].name}` +
      ' ' +
      `${customArray[indexArr[0]].areas[indexArr[1]].name}` +
      ' ' +
      `${customArray[indexArr[0]].areas[indexArr[1]].areas[indexArr[2]].name}`
    setAddress(addressText)
    const userRes = await UserService.editUserInfo({ address: addressText })
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
    <View className='MyDataPage__root'>
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
        <View className='data-img' onClick={toSetPic}>
          <View className='item-left'>头像</View>
          <View className='item-right'>
            <Image className='img' src={userStore.userInfo?.pic ? userStore.userInfo?.pic : myPhoto}></Image>
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
        <View className='item' onClick={() => setOpenCity(true)}>
          <View className='item-left'>常住地</View>
          <View className='item-right'>
            <Picker
              mode='multiSelector'
              range={onlyArray}
              onChange={addressOnChange}
              value={customIndex}
              onColumnChange={bindCustomPickerColumnChange.bind(this)}
            >
              {userStore.userInfo?.address && <View>{userStore.userInfo?.address}</View>}
              {!userStore.userInfo?.address && <View> {address}</View>}
            </Picker>
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
