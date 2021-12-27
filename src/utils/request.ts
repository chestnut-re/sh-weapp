import { userStore } from '@/store/context'
import Taro from '@tarojs/taro'

export const getHeader = () => {
  const ret: any = {}
  if (userStore.accessToken) {
    ret.Authorization = userStore.accessToken
  }

  if (userStore.city?.adcode) {
    ret.cId = userStore.city?.adcode ?? ''
  }

  return ret
}

/**
 * post 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doPostAction = ({ url, data }) => {
  return Taro.request({
    method: 'POST',
    url: url,
    header: getHeader(),
    data: data,
    dataType: 'test',
  })
}

/**
 * get 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doGetAction = ({ url, data }) => {
  return Taro.request({
    method: 'GET',
    url: url,
    header: getHeader(),
    data: data,
    dataType: 'test',
  })
}

/**
 * put 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doPutAction = ({ url, data }) => {
  return Taro.request({
    method: 'PUT',
    url: url,
    header: getHeader(),
    data: data,
    dataType: 'test',
  })
}

/**
 * delete 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doDeleteAction = ({ url }) => {
  return Taro.request({
    method: 'DELETE',
    url: url,
    header: getHeader(),
    dataType: 'test',
  })
}
