import Taro from '@tarojs/taro'
import { View, Input, Text, Image, Textarea } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { useRef, useState } from 'react'
import { observer } from 'mobx-react'

import './index.less'
import camera from '@/assets/img/yjfk/croma.png'
import success from '@/assets/img/yjfk/success.png'
/**
 * 意见反馈
 */
const FeedBackPage = (props) => {
  const { commonStore } = useStore()
  const [noteNowLen, setNoteNowLen] = useState(0)
  console.log(commonStore)

  const toFist = () => {
    Taro.navigateBack()
  }
  const toMyData = () => {
    Taro.showToast({
      image: success,
      title: '感谢您的反馈',
      duration: 2000,
    })
    // Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const getWords = (e) => {
    let value = e.detail.value
    let len = parseInt(value.length)
    if (len <= 400) {
      setNoteNowLen(len)
    } else return
  }
  const upLoad = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      },
    })
  }
  return (
    <View className='FeedBackPage__root'>
      <View className='text-content'>
        <Textarea className='text' placeholder='来告诉我们你的想法吧' onInput={getWords} maxlength={400} autoFocus />
        <View className='text-num'>{noteNowLen} / 400</View>
        <View className='upload' onClick={upLoad}>
          <Image className='img' src={camera} />
          <View className='img-text'>上传图片</View>
        </View>
      </View>
      <Button className='btn' onClick={toMyData}>
        提交反馈
      </Button>
    </View>
  )
}

export default observer(FeedBackPage)
