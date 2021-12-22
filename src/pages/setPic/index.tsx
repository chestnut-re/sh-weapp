import { View, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import Taro from '@tarojs/taro'
import { showMToast } from '@/utils/ui'
import { UserService } from '@/service/UserService'
import { observer } from 'mobx-react'

import './index.less'

/**
 * 设置头像
 */
const SetPicPage = () => {
  const { userStore } = useStore()

  const camera = (e) => {
    // 从手机相册中选择图片或使用相机拍照
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
    }).then(async (res) => {
      const obj = {
        file: res.tempFiles[0],
        url: res.tempFilePaths[0],
        name: '123.png',
      }
      const imgRes = await UserService.postUploadFile(obj)
      const ret = JSON.parse(imgRes.data)
      const updateRes = await UserService.editUserInfo({ pic: ret.data.fileUrl })
      if (updateRes.data.code == 200) {
        showMToast(updateRes.data.msg)
        userStore.getUserInfo()
      } else {
        showMToast(updateRes.data.msg)
      }
    })
  }

  const camera1 = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机
    }).then(async (res) => {
      console.log('chooseImage then', res)
      const obj = {
        file: res.tempFiles[0],
        url: res.tempFilePaths[0],
        name: '123.png',
      }
      const imgRes = await UserService.postUploadFile(obj)
      const ret = JSON.parse(imgRes.data)
      const updateRes = await UserService.editUserInfo({ pic: ret.data.fileUrl })
      if (updateRes.data.code == 200) {
        showMToast(updateRes.data.msg)
        userStore.getUserInfo()
      } else {
        showMToast(updateRes.data.msg)
      }
    })
  }

  return (
    <View className='SetPicPage__root'>
      <View className='box'></View>
      <View className='pic-img'>
        <Image className='img' src={userStore.userInfo?.pic}></Image>
      </View>
      <View className='btn-view'>
        <Button className='camera' onClick={camera1}>
          拍照
        </Button>
        <Button className='select' onClick={camera}>
          从相册中选择
        </Button>
      </View>
    </View>
  )
}

export default observer(SetPicPage)
