import { LocationService } from '@/service/LocationService'
import Taro from '@tarojs/taro'

/**
 * 获取最近的可用城市
 */
export const getSuggestCity = async () => {
  const locationInfo = await Taro.getLocation({})
  console.log('定位数据:', locationInfo)
  const ret = await LocationService.getClosestCityByLI({ lat: locationInfo.latitude, lng: locationInfo.longitude })
  return ret.data?.data
}
