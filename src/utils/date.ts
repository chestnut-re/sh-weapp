/**
 * 日期相关, date 封装
 */
/**
 * 时间戳转标准日期
 */
export function getMyDate(str) {
  var date = new Date(str),
    oYear = date.getFullYear(), //年
    oMonth = date.getMonth() + 1, //月
    oDay = date.getDate(), //日
    h = date.getHours(), //小时
    m = date.getMinutes(), //分钟
    s = date.getSeconds() //秒数
  // 以自己需要的方式拼接
  var oTime =
    oYear + '-' + getZero(oMonth) + '-' + getZero(oDay) + ' ' + getZero(h) + ':' + getZero(m) + ':' + getZero(s) //最后拼接时间
  return oTime
}
const getZero = (num) => {
  // 单数前面加0
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}
/**
 * 时间分割，去掉时分秒
 */
export function filterCurDate(date) {
  if (!date) {
    return ''
  }
  let ary = date.split(' ')
  let time = ary[1].split(':')
  let curTime = ary[0] + ' '
  // + time[0] + ":" + time[1];
  return curTime
}
// 结果：
// let myDate =getMyDate(1532602549345);
// console.log(myDate) //2018-07-26 18:55:49
