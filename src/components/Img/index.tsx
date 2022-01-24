import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'

// import { Image } from '@taroify/core'

import './index.less'

interface Props {
  url: any
  className: string
}

/**
 * Img 懒加载图片
 */
const Img: React.FC<Props> = ({ className, url }) => {
  const [finishLoadFlag, setFinishLoadFlag] = useState(false) as any

  const onImgLoad = (res) => {
    setFinishLoadFlag(true)
    console.log('onImgLoad', res)
  }
  return (
    !finishLoadFlag && url ? (
      <Image
        lazyLoad
        src={url}
        className={`Img__root ${className}`}
        onError={onImgLoad}
      />
    ) : (
      <Image
        lazyLoad
        src='https://shanhai-shoping.oss-cn-beijing.aliyuncs.com/img/user/pic/327f2ff9f41a4276a670494e49954fb4.gif'
        className={`Img__root ${className}`}
      />
    )

  )
}

export default Img
