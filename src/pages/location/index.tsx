/* eslint-disable react-hooks/exhaustive-deps */
import search from '@/assets/img/yjfk/seachtwo.png'
import back from '@/assets/img/yjfk/back.png'
import location from '@/assets/img/yjfk/location.png'
import del from '@/assets/img/password/del.png'
import Taro, { usePageScroll } from '@tarojs/taro' // Taro 专有 Hooks
import { View, Image, Input, ScrollView } from '@tarojs/components'
import { Sticky } from '@taroify/core'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import './index.less'

/**
 * 定位
 */
const LocationPage = () => {
  const [value, setValue] = useState('北京')
  const [scrollTop, setScrollTop] = useState(0)
  const [reachTop, setReachTop] = useState(true)
  const container = useRef()

  const INIT_VIEW = 'hot'
  const INIT_CITY_DATA = { city: {}, hotCity: [] }
  const [viewInto, setViewInto] = useState<string>(INIT_VIEW)
  const [cityData, setCityData] = useState<any>(INIT_CITY_DATA)
  // const handleCityClick = (city: any) => {
  //   storage.setItem('city', city)
  //   Taro.navigateBack({
  //     delta: 1,
  //   })
  // }
  const abc = {
    city: {
      h: [
        {
          id: '1000005',
          agent_id: '101',
          area_id: '131100',
          area_name: '衡水市',
          short_name: '衡水',
          alias: 'hengshui',
          alias_index: 'h',
          is_hot: '2',
        },
      ],
      s: [
        {
          id: '1000026',
          agent_id: '97',
          area_id: '420300',
          area_name: '十堰市',
          short_name: '十堰',
          alias: 'shiyan',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000028',
          agent_id: '97',
          area_id: '421300',
          area_name: '随州市',
          short_name: '随州',
          alias: 'suizhou',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000029',
          agent_id: '97',
          area_id: '421400',
          area_name: '上海',
          short_name: '上海',
          alias: 'shanghai',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000030',
          agent_id: '97',
          area_id: '421500',
          area_name: '深圳市',
          short_name: '深圳',
          alias: 'shenzhen',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000031',
          agent_id: '97',
          area_id: '421600',
          area_name: '苏州',
          short_name: '苏州',
          alias: 'suzou',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000032',
          agent_id: '97',
          area_id: '421700',
          area_name: '沈阳',
          short_name: '沈阳',
          alias: 'shenyang',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000033',
          agent_id: '97',
          area_id: '421800',
          area_name: '汕头',
          short_name: '汕头',
          alias: 'shantou',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000034',
          agent_id: '97',
          area_id: '421900',
          area_name: '韶关',
          short_name: '韶关',
          alias: 'shouguan',
          alias_index: 's',
          is_hot: '2',
        },
        {
          id: '1000035',
          agent_id: '97',
          area_id: '422000',
          area_name: '石家庄',
          short_name: '石家庄',
          alias: 'shijiazhuang',
          alias_index: 's',
          is_hot: '2',
        },
      ],
      w: [
        {
          id: '1000025',
          agent_id: '97',
          area_id: '420100',
          area_name: '武汉市',
          short_name: '武汉',
          alias: 'wuhan',
          alias_index: 'w',
          is_hot: '1',
        },
      ],
      x: [
        {
          id: '1000006',
          agent_id: '101',
          area_id: '420600',
          area_name: '襄阳市',
          short_name: '襄阳',
          alias: 'xiangyang',
          alias_index: 'x',
          is_hot: '1',
        },
      ],
      y: [
        {
          id: '1000027',
          agent_id: '97',
          area_id: '420500',
          area_name: '宜昌市',
          short_name: '宜昌',
          alias: 'yichang',
          alias_index: 'y',
          is_hot: '2',
        },
      ],
    },
    hotCity: [
      {
        id: '1000025',
        agent_id: '97',
        area_id: '420100',
        area_name: '武汉市',
        short_name: '武汉',
        alias: 'wuhan',
        alias_index: 'w',
        is_hot: '1',
      },
      {
        id: '1000006',
        agent_id: '101',
        area_id: '420600',
        area_name: '襄阳市',
        short_name: '襄阳',
        alias: 'xiangyang',
        alias_index: 'x',
        is_hot: '1',
      },
    ],
  }
  const renderCityList = (cityList: any) => {
    return (
      <View className='city-item-list'>
        {cityList.length > 0 &&
          cityList.map((item: any, index: number) => (
            <View key={index} className='city-name'>
              {item.short_name}
            </View>
          ))}
      </View>
    )
  }
  useEffect(() => {
    setCityData(abc)
  }, [])

  usePageScroll(({ scrollTop: aScrollTop }) => {
    setScrollTop(aScrollTop)
    setReachTop(aScrollTop === 0)
    console.log(reachTop)
  })

  const toHome = () => {
    Taro.navigateTo({ url: '/pages/index/index' })
  }
  return (
    <View className='LocationPage__root' ref={container}>
      {/* <PullRefresh loading={refreshingRef.current} reachTop={reachTop} onRefresh={onRefresh}> */}
      <Sticky className='sticky' container={container}>
        <View className='home-header'>
          <View className='now-place' onClick={toHome}>
            <Image className='place' src={back} />
          </View>
          <View className='search-input'>
            <Image className='search' src={search} />
            <Input className='input' type='text' placeholder='请输入城市名称' />
            <Image className='del' src={del} />
          </View>
        </View>
      </Sticky>
      <View className='location'>
        <View className='now'>当前定位</View>
        <View className='place-text'>
          <Image className='place' src={location} />
          {value}
        </View>
      </View>
      <View className='list-city'>
        <ScrollView scrollY className='city-content' scrollIntoView={viewInto}>
          <View className='city-list'>
            <View className='city-item'>
              <View className='city-item-order' id={INIT_VIEW}>
                热门城市
              </View>
              {renderCityList(cityData.hotCity)}
            </View>
            {Object.keys(cityData.city).map((key: string, index: number) => (
              <View className='city-item' key={index}>
                <View className='city-item-order' id={key}>
                  {key}
                </View>
                {renderCityList(cityData.city[key])}
              </View>
            ))}
          </View>
        </ScrollView>
        <View className='city-order'>
          <View className='city-order-list'>
            <View className='order-item' onClick={() => setViewInto(INIT_VIEW)}>
              🌟
            </View>
            {Object.keys(cityData.city).map((key: string, index: number) => (
              <View key={index} className='order-item' onClick={() => setViewInto(key)}>
                {key}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* </PullRefresh> */}
    </View>
  )
}

export default observer(LocationPage)
