import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View } from '@tarojs/components'
import { Tabs } from '@taroify/core'
import { useState } from 'react'
import { observer } from 'mobx-react'
import UsalMessageList from './components/usalMessageList'
import './index.less'
/**
 * 常用信息
 */
const UsualMessagePage = () => {
  const [value, setValue] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })

  return (
    <View className='UsualMessagePage__root'>
      <Tabs className='orderTabs' value={value} onChange={setValue}>
        <Tabs.TabPane title='出行人'>
          <UsalMessageList onName='出行人' />
        </Tabs.TabPane>
        <Tabs.TabPane title='地址'>
          <UsalMessageList onName='地址' />
        </Tabs.TabPane>
      </Tabs>
    </View>
  )
}

export default observer(UsualMessagePage)
