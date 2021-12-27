import React, { useState } from 'react'
import errorImg from '../../assets/img/common/error.gif'

import { Image } from '@taroify/core'

import './index.less'

interface Props {
  url: any
  className: string
}

/**
 * Img 懒加载图片
 */
const Img: React.FC<Props> = ({ className, url }) => {

  return (
    <Image
      lazyLoad
      src={url ? url : ' '}
      className={`Img__root ${className}`}
      fallback={<Image src={errorImg} />}
    />
  )
}

export default Img
