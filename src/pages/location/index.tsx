import search from '@/assets/img/yjfk/seachtwo.png'
import location from '@/assets/img/yjfk/location.png'
import refreshPNG from '@/assets/img/location/refresh.png'
import { View, Image, Input, ScrollView, Text } from '@tarojs/components'
import { Sticky } from '@taroify/core'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { LocationService } from '@/service/LocationService'
import { getFirstPingYin } from '@/utils/pingyin'
import { useStore } from '@/store/context'
import Taro from '@tarojs/taro'

import './index.less'

/**
 * 定位
 */
const LocationPage = () => {
  const { userStore } = useStore()
  const [viewInto, setViewInto] = useState<any>('A')
  const [cityData, setCityData] = useState<any>({})

  /**选择城市 */
  const _selectedCity = (city2: any) => {
    userStore.setCityCode(city2)
    Taro.navigateBack()
  }

  const renderCityList = (cityList: any) => {
    return (
      <View className='city-item-list'>
        {cityList.length > 0 &&
          cityList.map((item: any, index: number) => (
            <View
              key={index}
              className='city-name'
              onClick={() => {
                _selectedCity(item)
              }}
            >
              {item.name}
            </View>
          ))}
      </View>
    )
  }
  useEffect(() => {
    getProdAreaList()
  }, [])

  //获取有商品城市列表
  const getProdAreaList = async () => {
    const result = await LocationService.getProdAreaList()
    let firstPingying = ''
    if (result.data.code === '200') {
      const viewCityList = {}
      let lastPingyin = ''
      for (let i of result.data.data) {
        let newPingying = getFirstPingYin(i.name)
        if (!firstPingying) {
          firstPingying = newPingying
        }
        if (newPingying !== lastPingyin) {
          viewCityList[newPingying] = [{ ...i }]
        } else {
          viewCityList[newPingying].push({ ...i })
        }
        lastPingyin = newPingying
      }
      console.log(viewCityList)
      setCityData(viewCityList)
      setViewInto(firstPingying)
    }
  }

  const getCity = (a, b) => {
    setViewInto(a)
  }

  const _refreshLocation = () => {
    userStore.initCity(true)
  }

  return (
    <View className='LocationPage__root'>
      {/* <Sticky className='sticky'>
        <View className='home-header'>
          <View className='search-input'>
            <Image className='search' src={search} />
            <Input className='input' type='text' placeholder='请输入城市名称' />
            <Image className='del' src={del} />
          </View>
        </View>
      </Sticky> */}
      <View className='location'>
        <View className='now'>当前定位</View>
        <View className='place-text'>
          <View className='place-text-container'>
            <Image className='place' src={location} />
            {userStore.city?.name ?? '正在获取定位'}
          </View>

          <View onClick={_refreshLocation}>
            <Image className='refresh-ic' src={refreshPNG} />
            <Text className='refresh-text'>重新定位</Text>
          </View>
        </View>
      </View>
      <View className='list-city'>
        <ScrollView scrollY className='city-content' scrollIntoView={viewInto}>
          <View className='city-list'>
            {Object.keys(cityData).map((key: string, index: number) => (
              <View className='city-item' key={index}>
                <View className='city-item-order' id={key}>
                  {key}
                </View>
                {renderCityList(cityData[key])}
              </View>
            ))}
          </View>
        </ScrollView>
        <View className='city-order'>
          <View className='city-order-list'>
            {Object.keys(cityData).map((key: string, index: number) => (
              <View key={index} className='order-item' onClick={() => getCity(key, index)}>
                {key}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default observer(LocationPage)
