export const timestamp = () => +Date.now()

/**
 * 某时间和当前时间的间隔
 * @param publishTime 类时间字符串
 * @returns string
 */
export const getDateDiff = (time: string): string => {
  const timeNow = parseInt(`${new Date().getTime() / 1000}`, 10)

  let publishTime: number

  const re = /^[\d]+$/
  const timestamp = re.test(`${time}`)
  if (!timestamp) {
    const tmp = Date.parse(`${time}`)
    publishTime = tmp / 1000
  }
  else {
    publishTime = Number(time) / (time.length === 13 ? 1000 : 1)
  }

  const date = new Date(publishTime * 1000)
  const Y = date.getFullYear()
  let M: number | string = date.getMonth() + 1
  let D: number | string = date.getDate()
  let H: number | string = date.getHours()
  let m: number | string = date.getMinutes()
  let s: number | string = date.getSeconds()
  // 小于10的在前面补0
  if (M < 10)
    M = `0${M}`

  if (D < 10)
    D = `0${D}`

  if (H < 10)
    H = `0${H}`

  if (m < 10)
    m = `0${m}`

  if (s < 10)
    s = `0${s}`

  const d = timeNow - publishTime
  const d_days = parseInt(`${d / 86400}`, 10)
  const d_hours = parseInt(`${d / 3600}`, 10)
  const d_minutes = parseInt(`${d / 60}`, 10)
  const d_seconds = parseInt(`${d}`, 10)

  if (d_days > 0 && d_days < 3) {
    return `${d_days}天前`
  }
  else if (d_days <= 0 && d_hours > 0) {
    return `${d_hours}小时前`
  }
  else if (d_hours <= 0 && d_minutes > 0) {
    return `${d_minutes}分钟前`
  }
  else if (d_seconds < 60) {
    if (d_seconds <= 0)
      return '刚刚'

    return `${d_seconds}秒前`
  }
  else if (d_days >= 3 && d_days < 30) {
    return `${M}-${D} ${H}:${m}`
  }
  else if (d_days >= 30) {
    return `${Y}-${M}-${D} ${H}:${m}`
  }
  return ''
}

/**
 * 简单的日期格式化
 * @param utc 时间戳: 10位时间戳/13位时间戳/任何时间格式
 * @param format 时间格式 yyyy-mm-dd hh-ii-ss.SSS | yyyy-m-d h-i-s.S
 * @param add 需要添加的天数
 * @returns 日期
 */
export const UTC2Date = (utc?: string | number, format?: string, add?: number): string => {
  if (!format)
    format = 'yyyy-mm-dd'
  let newDate
  const re = /^[\d]+$/
  if (utc) {
    if (typeof utc === 'number')
      utc = `${utc}`
    try {
      if (re.test(utc)) {
        if (utc.length === 10)
          newDate = new Date(Number(`${utc}000`))
        else if (utc.length === 13)
          newDate = new Date(Number(utc))
      }
      else {
        utc = utc.replace(/-/g, '/').replace('.000000', '')
        newDate = new Date(utc)
      }
    }
    catch (error) {

    }
  }
  if (!newDate)
    newDate = new Date()

  if (add)
    newDate = new Date(newDate.setDate(newDate.getDate() + add))

  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hour = newDate.getHours()
  const minute = newDate.getMinutes()
  const second = newDate.getSeconds()
  const millisecond = newDate.getMilliseconds()

  const monthString = month < 10 ? `0${month}` : `${month}`

  return format
    .replace('yyyy', year.toString())
    .replace('mm', monthString)
    .replace('m', month.toString())
    .replace('dd', (day < 10 ? '0' : '') + day.toString())
    .replace('d', day.toString())
    .replace('hh', (hour < 10 ? '0' : '') + hour.toString())
    .replace('h', hour.toString())
    .replace('ii', (minute < 10 ? '0' : '') + minute.toString())
    .replace('i', minute.toString())
    .replace('ss', (second < 10 ? '0' : '') + second.toString())
    .replace('s', second.toString())
    .replace('SSS', (millisecond < 100 ? '0' : '') + (millisecond < 10 ? '0' : '') + millisecond.toString())
    .replace('S', millisecond.toString())
}
