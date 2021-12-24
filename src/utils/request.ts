import { userStore } from '@/store/context'
import Taro from '@tarojs/taro'

export const getHeader = () => {
  return {
    Authorization: userStore.accessToken,
    cId: userStore.city?.adcode ?? '',
  }
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
  })
}

/**
 * delete 请求
 * @param path 路径
 * @param data data
 * @returns
 */
export const doDeleteAction = ({ url, data }) => {
  return Taro.request({
    method: 'DELETE',
    url: url,
    header: getHeader(),
    data: data,
  })
}
