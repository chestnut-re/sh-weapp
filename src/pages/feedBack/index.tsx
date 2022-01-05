/* eslint-disable import/first */
import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import { useState } from 'react'
import { observer } from 'mobx-react'
import camera from '@/assets/img/yjfk/croma.png'
import success from '@/assets/img/yjfk/success.png'
import closeIcon from '@/assets/img/yjfk/closeIcon.png'
import { UserService } from '@/service/UserService'
import { SetUpService } from '@/service/SetUpService'

import './index.less'
/**
 * 意见反馈
 */
const FeedBackPage = () => {
  const { commonStore } = useStore()
  const [noteNowLen, setNoteNowLen] = useState(0)
  const [description, setDescription] = useState('')
  const [upLoadImg, setUpLoadImg] = useState([] as any)

  const toMyData = () => {
    if (description == '') {
      Taro.showToast({
        image: 'none',
        title: '请输入反馈内容',
        duration: 2000,
      })
      return
    }
    const params = {} as any
    params.feedbackDescription = description
    params.feedbackImgUrl = upLoadImg.join(',')
    console.log('resres', params)
    SetUpService.feedback(params).then((res) => {
      const { data } = res
      if (data.code == 200) {
        Taro.showToast({
          image: success,
          title: '感谢您的反馈',
          duration: 2000,
          success: () => {
            setTimeout(() => {
              Taro.navigateBack()
            }, 2000)
          }
        })
      } else {
        Taro.showToast({
          image: 'none',
          title: '意见反馈失败',
          duration: 2000,
        })
      }
      console.log('resres', res)
    })

    // Taro.navigateTo({ url: '/pages/myData/index' })
  }
  const getWords = (e) => {
    let value = e.detail.value
    let len = parseInt(value.length)
    if (len <= 400) {
      setDescription(value)
      setNoteNowLen(len)
    } else return
  }
  const upLoad = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: async (res) => {
        const obj = {
          file: res.tempFiles[0],
          url: res.tempFilePaths[0],
          name: '123.png',
        }
        const imgRes = await UserService.postUploadFile(obj)
        const { data } = JSON.parse(imgRes.data)
        const imgUrl = `${data.ossServerUrl}${data.fileUrl}`
        upLoadImg.push(imgUrl)
        setUpLoadImg([...upLoadImg])

        console.log('[旺柴][旺柴]', upLoadImg, imgRes)


        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

      },
    })
  }
  const onDeleteImg = (i) => {
    const newUpLoadImg = upLoadImg.filter((item, index) => {
      return index != i
    })
    setUpLoadImg(newUpLoadImg)
  }
  return (
    <View className='FeedBackPage__root'>
      <View className='text-content'>
        <Textarea className='text' placeholder='来告诉我们你的想法吧' onInput={getWords} maxlength={400} autoFocus />
        <View className='text-num'>{noteNowLen} / 400</View>
        <View className='uploadView'>
          {upLoadImg && upLoadImg.length > 0 && upLoadImg.map((item, index) => (
            <View key={`index${index}`} className='upload'>
              <Image className='img' src={item} />
              <View onClick={() => onDeleteImg(index)} className='closeView'>
                <Image className='closeIcon' src={closeIcon} />
              </View>
            </View>
          ))}
          {upLoadImg.length < 3 && (
            <View className='upload' onClick={upLoad}>
              <Image className='img' src={camera} />
              <View className='img-text'>{upLoadImg.length}/3</View>
            </View>
          )}
        </View>
      </View>
      <Button className='btn' onClick={toMyData}>
        提交反馈
      </Button>
    </View>
  )
}

export default observer(FeedBackPage)
