/* eslint-disable import/first */
import { View, Input, Image } from '@tarojs/components'
import { useStore } from '@/store/context'
import { Button } from '@taroify/core'
import Taro, { showToast } from '@tarojs/taro'
import { UserService } from '@/service/UserService'
import { observer } from 'mobx-react'
import { useState } from 'react'

import './index.less'
import { showMToast } from '@/utils/ui'
/**
 * 设置头像
 */
const SetPicPage = () => {
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
  const camera = (e) => {
    e.preventDefault()
    let { flag } = e.currentTarget.dataset
    switch (flag) {
      case 'portrait': {
        // 从手机相册中选择图片或使用相机拍照
        Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
        }).then(async (res) => {
          //我使用链式写法，也可以使用官方文档提供的方式
          console.warn('chooseImage then', res)
          const files = []
          // 以下几行代码是为了处理成自己想要的格式[{file: {path: '', size: ''}, url: '' }]
          const obj = {}
          obj.file = res.tempFiles[0]
          obj.url = res.tempFilePaths[0]
          files.push(obj)
          console.warn('then obj', files)
          return
          // 上传到七牛返回的图片连接，可以在线访问
          const itemImgUrlLIst = await utils.transImgList(files || [])
          console.warn('then itemImgUrlLIst', itemImgUrlLIst)
          Taro.showLoading()
          // 把返回的链接传给更换个人信息的接口，完成头像更换
          this.props
            .dispatch({
              type: 'mine/fecthupdatePersonInfo',
              payload: {
                headImg: itemImgUrlLIst[0], // 因为是个数组，获取数组第一个元素
              },
            })
            .then((res) => {
              if (res.resultCode === 200) {
                Taro.hideLoading()
                utils.showToastMsg('更换头像成功')
                // 更换调全局缓存的数据，要不显示不出来
                const userInfo = getGlobalData('userInfo')
                userInfo.headImg = itemImgUrlLIst[0]
                setGlobalData('userInfo', userInfo)
                this.componentDidMount()
              }
            })
        })
        break
      }
      case 'name': {
        Taro.navigateTo({
          url: `/subMinePages/UpdateName/UpdateName`,
        })
        break
      }

      case 'phone': {
        Taro.navigateTo({
          url: `/subMinePages/UpdatePhone/UpdatePhone`,
        })
        break
      }

      case 'address': {
        Taro.navigateTo({
          url: `/subMinePages/MyAddress/MyAddress`,
        })
        break
      }
      default: {
        break
      }
    }
  }
  return (
    <View className='SetPicPage__root'>
      <View className='name-img'>
        <Image src={userStore.userInfo?.pic}></Image>
      </View>
      <Button className='btn' onClick={camera}>
        拍照
      </Button>
      <Button className='btn' onClick={camera}>
        从相册中选择
      </Button>
      <Button className='btn' onClick={camera}>
        完成
      </Button>
    </View>
  )
}

export default observer(SetPicPage)
