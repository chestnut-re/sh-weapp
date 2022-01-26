/**
 *
 * @param price number | string
 * @param toFixed number
 * @returns number
 * 格式化价格方法
 */
export const getPrice = (price: number | string, toFixed = 0) => {
  if (price == '' || price == null) {
    return '0.00'
  }
  let priceInt = (Number(price) / 1000).toFixed(toFixed)
  return priceInt
}

export const getIntPrice = (price: number | string, toFixed = 0) => {
  return parseInt(getPrice(price, toFixed))
}
