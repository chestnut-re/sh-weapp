import { h5Domain } from './c'

/// h5 协议地址
export class H5 {
  /// 隐私协议
  static privacy = `${h5Domain}/protocol/privacy`

  /// 服务协议
  static service = `${h5Domain}/protocol/platform-service`

  /// 参考行程
  static referenceRouter = `${h5Domain}/travel/route`

  /// 我的行程
  static myTravel = `${h5Domain}/my-travel`

  /// 我的乐豆
  static myToken = `${h5Domain}/my-token`

  /// 商品详情
  static goodsDetail = `${h5Domain}/goods-detail`

  /// 团小店
  static groupShop = `${h5Domain}/group-shop`

  /// 订单详情页
  static orderDetail = `${h5Domain}/order-detail`

  /// H5 测试页面
  static testPage = `${h5Domain}/test/page`

  /**支付详情页 */
  static payResult = `${h5Domain}/pay-success`

  /// H5 添加出行人
  static personalDetails = `${h5Domain}/personal-details`
  /// H5 出行人详情
  static personalDetail = `${h5Domain}/personal-details?id=`

  /**专题活动 */
  static specialEvents = `${h5Domain}/special-events`

  /** 乐豆说明页 */
  static beansExplain = `${h5Domain}/beans-explain`
  /** 再次购买 */
  static submitOrder = `${h5Domain}/submit-order`

  /** 添加出行人 */
  static personalBind = `${h5Domain}/personal-bind`
}
