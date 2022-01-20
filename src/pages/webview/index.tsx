import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { WebView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import './index.less'
import { dealWebViewURL, getUrlParams, getUrlPath } from '@/utils/webviewUtils'
import { UserService } from '@/service/UserService'

/**
 * 网页
 */
const WebViewPage = () => {
  const { userStore, commonStore } = useStore()

  const [initUrl, setInitUrl] = useState('')

  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['wechatMoment', 'wechatFriends']
    })

    const url = decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.url ?? '')

    // 判断是否登录，没有登录先去登录
    if (!userStore.isBindMobile && getUrlPath(url) == 'goods-detail') {

      Taro.navigateTo({ url: `/pages/login/index?url=${Taro.getCurrentInstance()?.router?.params?.url ?? ''}&from=web` })
    } else {
      onJumpUrl(url)
    }
    return () => {
      if (getUrlPath(url) == 'goods-detail') {
        console.log('123123123123123123312')
        userStore.likeCount()
      }
    }
  }, [])

  const onJumpUrl = (url) => {
    const webUrlParams = getUrlParams(url)
    if (webUrlParams.userId && getUrlPath(url) == 'goods-detail') {
      console.log(getUrlPath(url))
      UserService.bindRecommend(webUrlParams.userId)
    }
    console.log('initUrl11111', dealWebViewURL(url))

    setInitUrl(dealWebViewURL(url))
  }

  const handleMessage = (event: any) => {
    console.log(event)
  }

  return <WebView src={initUrl} onMessage={handleMessage} />
}

export default observer(WebViewPage)
