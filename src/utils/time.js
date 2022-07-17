/**
 * @titile 时间处理器
 * @description 专门对时间格式转化进行处理
 * 获取格式化时间、获取一段时间后日期对象、求两个时间差
 * */

/**
 * @description 获取格式化时间
 * @param {String} [format] - 格式化 'YYYY-MM-DD HH:mm:ss' HH：表示24小时，hh表示12小时
 * @param {TimeStamp} [timestamp] - 时间戳
 * @retrun 2021-01-01 01:01:01、2021/01/01 01:01:01
 * @example FormatTime('YYYY-MM-DD HH:mm:ss WW', 1655885503100)
 * @author changz
 * */
export function FormatTime(format, timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date()
  if (!format) return date
  if (format.includes('YYYY')) format = format.replace('YYYY', date.getFullYear())
  if (format.includes('MM')) format = format.replace('MM', fillZero(date.getMonth() + 1))
  if (format.includes('DD')) format = format.replace('DD', fillZero(date.getDate()))
  if (format.includes('HH')) format = format.replace('HH', fillZero(date.getHours()))
  if (format.includes('hh')) format = format.replace('hh', fillZero(date.getHours() % 12))
  if (format.includes('mm')) format = format.replace('mm', fillZero(date.getMinutes()))
  if (format.includes('ss')) format = format.replace('ss', fillZero(date.getSeconds()))
  if (format.includes('WW')) {
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    format = format.replace('WW', weekday[date.getDay()])
  }
  return format
}

/**
 * @description 获取一段时间前或后的日期对象
 * @param {Number} [number] - 多长时间，可以为负数
 * @param {String} [format] - 只支持 YYYY 年 MM 月 DD 天 hh 小时 mm 分钟 ss 秒 TS 时间戳 前或后
 * @param {Date} [date] - 开始日期对象
 * @example CalcDate(7, 'DD') 七天后
 * @author changz
 * */
export function CalcDate(number, format, date) {
  const cDate = date || new Date()
  let stamp = null
  if (!format) return cDate
  if (format === 'YYYY') {
    const year = cDate.getFullYear() + number
    stamp = cDate.setFullYear(year)
  }
  if (format === 'MM') {
    const mounth = cDate.getMonth() + number
    stamp = cDate.setMonth(mounth)
  }
  if (format === 'DD') {
    const day = cDate.getDate() + number
    stamp = cDate.setDate(day)
  }
  if (format === 'hh') {
    const hour = cDate.getHours() + number
    stamp = cDate.setHours(hour)
  }
  if (format === 'mm') {
    const minute = cDate.getMinutes() + number
    stamp = cDate.setMinutes(minute)
  }
  if (format === 'ss') {
    const minute = cDate.getSeconds() + number
    stamp = cDate.setSeconds(minute)
  }
  if (format === 'TS') {
    const ts = cDate.getTime() + number
    stamp = cDate.setTime(ts)
  }
  return new Date(stamp)
}

/**
 * @description 计算两个日期的差值
 * @param {String} [start] - 开始时间
 * @param {String} [end] - 结束时间
 * @example DiffDate('2022-06-19', '2022-06-20 03:04:01')
 * @return 1天3小时3分钟1秒
 * @author changz
 * */
export function DiffDate(start, end) {
  if (start.includes('-')) start = start.replace(/-/g, '/')
  if (end.includes('-')) end = end.replace(/-/g, '/')
  let result = ''
  const startStamp = new Date(start).getTime()
  const endStamp = new Date(end).getTime()
  const total = (endStamp - startStamp) / 1000
  const day = Math.floor(total / (60 * 60 * 24))
  if (day) result += `${day}天`
  const hour = Math.floor((total - (day * 24 * 60 * 60)) / (60 * 60))
  if (hour) result += `${hour}小时`
  const minute = Math.floor((total - (day * 24 * 60 * 60) - (hour * 60 * 60)) / 60)
  if (minute) result += `${hour}分钟`
  const second = total - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60)
  if (second) result += `${second}秒`
  return result
}

/**
 * @description 获取某年某个月有多少
 * @param {Number} [year] - 某年
 * @param {Number} [mounth] - 某月
 * @example MounthDay(2022, 6)
 * @author changz
 * */
export function MounthDay(year, mounth) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
    days[1] = 29
  }
  return days[mounth - 1]
}

// 补零
function fillZero(num) {
  return num < 10 ? '0' + num : num
}