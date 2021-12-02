import { View } from '@tarojs/components'
import { useStore } from '@/store/context'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import TabBar from '../../components/tabbar'
import MineScreen from './components/mine'
import MsgScreen from './components/msg'
import HomeScreen from './components/home'
import './index.less'

const IndexPage = (props) => {
  const { userStore } = useStore()
  const [index, setIndex] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    userStore.init()
  }, [])

  const onTabClick = (newIndex: number) => {
    setIndex(newIndex)
    // setScrollTop(0.1)
    // console.log(scrollTop)
  }

  return (
    <View className='IndexPage__root'>
      <View style={index == 0 ? { display: 'block ' } : { display: 'none' }}>
        <HomeScreen />
      </View>
      <View style={index == 1 ? { display: 'block ' } : { display: 'none' }}>
        <MsgScreen />
      </View>
      <View style={index == 2 ? { display: 'block ' } : { display: 'none' }}>
        <MineScreen />
      </View>
      <TabBar onClick={onTabClick} />
    </View>
  )
}

export default observer(IndexPage)
