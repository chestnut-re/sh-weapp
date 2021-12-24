/* eslint-disable import/first */
import { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { Tabs, List, Loading, PullRefresh } from '@taroify/core'
import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { TravelerService } from '@/service/TravelerService'
import { useStore } from '@/store/context'
import { showMToast } from '@/utils/ui'
import jump from '@/assets/img/yjfk/jump.png'
import add from '@/assets/img/traveler/add.png'
import './index.less'
/**
 * 常用信息
 */
const UsualMessagePage = () => {
  const { userStore } = useStore()
  const [hasMore, setHasMore] = useState(true)
  const [list, setList] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const refreshingRef = useRef(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  useEffect(() => {
    travelerList()
  }, [])
  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
  })
  const onLoad = () => {
    setLoading(true)
    const newList = refreshingRef.current ? [] : list
    setTimeout(() => {
      refreshingRef.current = false
      for (let i = 0; i < 10; i++) {
        const text = newList.length + 1
        newList.push(text < 10 ? '0' + text : String(text))
      }
      setList(newList)
      setLoading(false)
      setHasMore(newList.length < 11)
    }, 1000)
  }

  function onRefresh() {
    refreshingRef.current = true
    setLoading(false)
    onLoad()
  }
  const travelerList = async () => {
    const result = await TravelerService.getTravelerList()
    console.log(result)
    if (result.data.code === '200') {
      showMToast(result.data.msg)
      // setList(result.data.data.records)
    } else {
      showMToast(result.data.msg)
    }
  }
  return (
    <View className='UsualMessagePage__root'>
      {/* <Tabs className='orderTabs' value={value} onChange={setValue}>
        <Tabs.TabPane title='出行人'>
          <UsalMessageList onName='出行人' />
        </Tabs.TabPane>
        <Tabs.TabPane title='地址'>
          <UsalMessageList onName='地址' />
        </Tabs.TabPane>
      </Tabs> */}
      <View className='add-mode'>
        <View className='add' onClick={travelerList}>
          <Image className='img' src={add} />
          <Text className='add-text'>添加 出行人</Text>
        </View>
      </View>
      <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}>
        <List loading={loading} hasMore={hasMore} onLoad={onLoad}>
          {list.map((item) => (
            <View className='item' key={item}>
              <View className='card'>
                <View className='left-all'>
                  <View className='left-top'>
                    <View className='user-name'>
                      <View className='state'>李买买</View>
                      {item === '01' ? <View className='myself'>本人</View> : null}
                    </View>
                    <View className='tel'>188*****678</View>
                  </View>
                  <View className='left-id'>{Number(item) % 2 ? '身份证 1100 **** **** **8899' : '护照 11****99'}</View>
                </View>
                <Image className='jump' src={jump} />
              </View>
            </View>
          ))}
          {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          )}
        </List>
      </PullRefresh>
    </View>
  )
}

export default observer(UsualMessagePage)
