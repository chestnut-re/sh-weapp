import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { View, WebView } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import './index.less'

/**
 * 网页
 */
const WebViewPage = (props) => {
  const { commonStore } = useStore()
  const [initUrl, setInitUrl] = useState('')

  useEffect(() => {
    setInitUrl(decodeURIComponent(Taro.getCurrentInstance()?.router?.params?.url ?? ''))
    // setInitUrl('http://123.56.248.148/protocol/service')
  }, [])

  const handleMessage = (event: any) => {
    console.log(event)
  }

  return <WebView src={initUrl} onMessage={handleMessage} />
}

export default observer(WebViewPage)
