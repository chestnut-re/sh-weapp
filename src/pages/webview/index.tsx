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
    // Taro.showShareMenu({
    //   withShareTicket: true,
    //   showShareItems: ['wechatMoment', 'wechatFriends']
    // })

    const url = decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.url ?? '')

    // 判断是否登录，没有登录先去登录
    if (!userStore.isBindMobile && (getUrlPath(url) == 'goods-detail' || getUrlPath(url) == 'group-shop')) {
      const bizId = getUrlParams(url)['bizId']
      const taskId = getUrlParams(url)['taskId'] // 任务id
      const userId = getUrlParams(url)['userId']
      const source = getUrlParams(url)['source'] // 订单来源
      if (taskId && userId) {
        commonStore.taskId = taskId
      }
      if (bizId) {
        commonStore.bizId = bizId
      }
      if (source) {
        commonStore.source = source
      }
      if (!bizId && getUrlPath(url) == 'goods-detail') {
        commonStore.goodsId = 'goods'
      }
      // 未登录
      commonStore.setAfterLoginCallback(() => {
        Taro.navigateBack()
        onJumpUrl(url)
        commonStore.removeAfterLoginCallback()
      })
      Taro.navigateTo({ url: `/pages/login/index` })
    } else {
      onJumpUrl(url)
    }
    console.log('getUrlParams(url)', getUrlParams(url))

    return () => {
      console.log('123123123123 personal-details', getUrlPath(url))


      if (getUrlPath(url) == 'goods-detail') {
        userStore.likeCount()
      }
    }
  }, [])

  const onJumpUrl = (url) => {
    const webUrlParams = getUrlParams(url)
    if (webUrlParams.userId && getUrlPath(url) == 'goods-detail') {
      UserService.bindRecommend(webUrlParams.userId)
    }

    console.log(dealWebViewURL(url))
    setInitUrl(dealWebViewURL(url))
  }

  const handleMessage = (event: any) => {
    console.log('postMessage', event)
  }

  return <WebView src={initUrl} onMessage={handleMessage} />
}

export default observer(WebViewPage)
