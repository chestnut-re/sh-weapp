import { h5Domain } from './c'

/// h5 协议地址
export class H5 {
  /// 隐私协议
  static privacy = `${h5Domain}/protocol/privac`

  /// 服务协议
  static service = `${h5Domain}/protocol/service`

  /// 参考行程
  static referenceRouter = `${h5Domain}/travel/route`

  /// 我的行程
  static myTravel = `${h5Domain}/my-travel`

  /// 我的代币
  static myToken = `${h5Domain}/my-token`

  /// 商品详情
  static goodsDetail = `${h5Domain}/goods-detail`

 /// 团小店
  static abulkShop = `${h5Domain}/abulkshop`

  /// 订单详情页
  static orderDetail = `${h5Domain}/orderdetail?type=1`

  /// H5 测试页面
  static testPage = `${h5Domain}/test/page`
}
