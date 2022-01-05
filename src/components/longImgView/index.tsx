import React, { useState } from 'react'
import Taro from '@tarojs/taro'

import { Popup } from "@taroify/core"
import { View, Text, Image, Button } from '@tarojs/components'
import download from '@/assets/img/mine/download.png'

import './index.less'

interface Props {
  open: any
  imgUrl: any
  // onLongImg: () => void
  onClose: () => void
}

/**
 * 生成图片预览
 */
const LongImgView: React.FC<Props> = ({ open, onClose, imgUrl }) => {
  /**
   * 保存到相册
   */
  const onClickSaveImage = () => {
    Taro.getSetting({
      success(res) {
        // 如果没有授权过，则要获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          Taro.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              savePictureSystem()
            },
            fail() { // 用户拒绝
              Taro.showModal({
                title: '授权',
                content: '您拒绝了授权请求，是否要手动开启？',
                success: function (resModal) {
                  if (resModal.confirm) {
                    Taro.openSetting({
                      success: function (resSetting) {
                        console.log(resSetting.authSetting)
                        resSetting.authSetting = {
                          "scope.userInfo": true,
                          "scope.userLocation": true
                        }
                      }
                    })
                  } else if (resModal.cancel) {
                    Taro.showToast({
                      title: '保存失败！',
                      duration: 2000
                    })
                  }
                }
              })
            }
          })
        } else { // 如果已经授权过，可以直接保存
          savePictureSystem()
        }
      }
    })
  }

  const savePictureSystem = () => {
    Taro.saveImageToPhotosAlbum({
      filePath: imgUrl,
      success(res) {
        Taro.showToast({
          title: '保存成功!'
        })
        onClose()
      },
      fail() {
        Taro.showToast({
          title: '保存失败!',
          duration: 2000
        })
      }
    })
  }
  return (
    <Popup className='longImgPopup' onClose={onClose} open={open}>
      <View className='longImgView'>
        <View className='longImg'>
          <Image mode='aspectFit' className='longImg' src={imgUrl} />
        </View>

        <View className='operateImg'>
          <View className='operateTitle'>
            分享此图片给好友
          </View>
          <View className='operateContents'>
            <View className='item' onClick={onClickSaveImage}>
              <Image className='img' src={download} />
              <View className='txt'>保存</View>
            </View>
          </View>
          <View className='longImgBtn'>
            <View onClick={onClose} className='btn'>
              取消
            </View>
          </View>
        </View>
      </View>
    </Popup>
  )
}

export default LongImgView
