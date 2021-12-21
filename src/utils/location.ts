import Taro from '@tarojs/taro'

/**
 * 获取最近的可用城市
 */
export const getSuggestCity = async () => {
  const locationInfo = await Taro.getLocation({})
  console.log(locationInfo)
  // latitude， longitude
  // TODO：接口，获取最近城市
}
