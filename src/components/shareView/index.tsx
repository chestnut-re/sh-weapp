import React, { useState } from 'react'
import Taro from '@tarojs/taro'

import { Popup } from "@taroify/core"
import { View, Text, Image, Button } from '@tarojs/components'
import circle from '@/assets/img/mine/circle.png'
import weCat from '@/assets/img/mine/weCat.png'
import long from '@/assets/img/mine/long.png'
import link from '@/assets/img/mine/link.png'
import './index.less'

interface Props {
  open: any
  copyLink: string
  onLongImg: () => void
  onClose: () => void
}

/**
 * 分享组件
 */
const ShareView: React.FC<Props> = ({ open, copyLink, onLongImg, onClose }) => {
  const onCopyLink = () => {
    Taro.setClipboardData({
      data: copyLink,
      success() {
        Taro.getClipboardData({
          success(res) {
            console.log('res.data', res.data) // data
          }
        })
      }
    })
  }
  return (
    <Popup onClose={onClose} onClick={() => { console.log('123') }} className='sharePopup' open={open} rounded placement='bottom' style={{ height: '40%' }} >
      <Popup.Close />
      <View className='sharePopupView'>
        <View className='shareTitle'>
          分享给TA 一起嗨玩
        </View>
        <View className='shareContents'>
          <Button className='item' openType='share' plain id='1'>
            <Image className='img' src={weCat} />
            <View className='txt'>微信</View>
          </Button>
          <Button className='item' openType='share' plain id='2'>
            <Image className='img' src={circle} />
            <View className='txt'>朋友圈</View>
          </Button>
          {copyLink && (
            <View className='item' onClick={onCopyLink}>
              <Image className='img' src={link} />
              <View className='txt'>链接</View>
            </View>
          )}

          <View onClick={onLongImg} className='item'>
            <Image className='img' src={long} />
            <View className='txt'>长图</View>
          </View>
        </View>
        <View className='shareBtn'>
          <View onClick={onClose} className='btn'>
            取消
          </View>
        </View>
      </View>
    </Popup>
  )
}

export default ShareView
