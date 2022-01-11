import React, { useState } from 'react'

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
      fallback={<Image src="https://shanhai-shoping.oss-cn-beijing.aliyuncs.com/img/user/pic/327f2ff9f41a4276a670494e49954fb4.gif" />}
    />
  )
}

export default Img
