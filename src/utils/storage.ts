/**
 * 本地数据存储类
 */
import Taro from '@tarojs/taro'

/**
 * 存储数据
 * @param {string} key
 * @param {string} data
 */
export const save = async (key: string, data: any) => {
  await Taro.setStorage({
    key: key,
    data: data,
  })
}

/**
 * 获取存储数据
 * @param {string} key
 */
export const get = async (key: string) => {
  return await Taro.getStorage({
    key: key,
  })
}

/**
 * 删除存储数据
 * @param {string} key
 */
export const remove = async (key: string) => {
  return await Taro.removeStorage({
    key: key,
  })
}

/**
 * 清理存储数据
 */
export const clearStorage = async () => {
  return await Taro.clearStorage({})
}
