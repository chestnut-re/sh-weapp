/* eslint-disable import/first */
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Text, Image } from '@tarojs/components'
import { Tabs, List, Loading, PullRefresh, SwipeCell, Button } from '@taroify/core'
import { H5 } from '@/constants/h5'
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
  const [list, setList] = useState<any>([])
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
    if (result.data.code === '200') {
      setList(result.data.data)
    } else {
      showMToast(result.data.msg)
    }
  }
  const toAddTravel = () => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${H5.personalDetails}` })
  }
  const toItemDetail = (e) => {
    Taro.navigateTo({ url: `/pages/webview/index?url=${encodeURIComponent(H5.personalDetail)}` + e })
    // url: `/pages/webview/index?url=${encodeURIComponent(H5.personalDetail)}`
  }
  const cutItem = async (e) => {
    console.log(e)
    const result = await TravelerService.delTraveler(e)
    if (result.data.code === '200') {
      showMToast(result.data.msg)
      travelerList()
    } else {
      showMToast(result.data.msg)
    }
    console.log(result)
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
        <View className='add' onClick={toAddTravel}>
          <Image className='img' src={add} />
          <Text className='add-text'>添加 出行人</Text>
        </View>
      </View>
      {/* <PullRefresh className='list' loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      {/* <List loading={loading} hasMore={hasMore} onLoad={onLoad}> */}
      {list.map((item) => (
        <View className='item' key={item.travelerId}>
          <SwipeCell className='custom-swipe-cell'>
            <View className='card' onClick={() => toItemDetail(item.travelerId)}>
              <View className='left-all'>
                <View className='left-top'>
                  <View className='user-name'>
                    <View className='state'>{item.travelerName}</View>
                    {item.userTravelerRelation === 0 && <View className='myself'>本人</View>}
                  </View>
                  <View className='tel'>{item.phoneNumber}</View>
                </View>
                <View className='left-id'>
                  {item.travelerCertificate.length > 0 && item.travelerCertificate[0].certificateType == 1
                    ? '身份证 ' + item.travelerCertificate[0].certificateNo
                    : '未填写证件'}
                </View>
              </View>
              <Image className='jump' src={jump} />
            </View>
            <SwipeCell.Actions side='right'>
              <Button variant='contained' shape='square' color='danger' onClick={() => cutItem(item.travelerId)}>
                删除
              </Button>
            </SwipeCell.Actions>
          </SwipeCell>
        </View>
      ))}
      {/* {!refreshingRef.current && (
            <List.Placeholder>
              {loading && <Loading>加载中...</Loading>}
              {!hasMore && '没有更多了'}
            </List.Placeholder>
          )} */}
      {/* </List> */}
      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(UsualMessagePage)
