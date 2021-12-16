import { doGetAction, doPostAction, doPutAction } from '@/utils/request'
import { BASE_URL } from '../constants/c'

/**
 * 定位相关
 */
 export class LocationService {
  /// 城市列表
  static getAreaList() {
    return doGetAction({ url: `${BASE_URL}/area/areaListInfo`, data: {} })
  }

   ///有商品的城市列表
   static getProdAreaList () {
     return doGetAction({ url: `${BASE_URL}/area/prodAreaList`, data: {} })
  }
}