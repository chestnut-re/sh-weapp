import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { WebView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import './index.less'
import { dealWebViewURL } from '@/utils/webviewUtils'

/**
 * 网页
 */
const WebViewPage = () => {
  const [initUrl, setInitUrl] = useState('')

  useEffect(() => {
    Taro.showShareMenu({
      withShareTicket: true,
      showShareItems: ['wechatMoment', 'wechatFriends']
    })
    const url = decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.url ?? '')
    console.log(dealWebViewURL(url));
    setInitUrl(dealWebViewURL(url))
  }, [])

  const handleMessage = (event: any) => {
    console.log(event)
  }

  return <WebView src={initUrl} onMessage={handleMessage} />
}

export default observer(WebViewPage)
