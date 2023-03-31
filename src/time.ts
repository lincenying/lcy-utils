export const timestamp = () => +Date.now()

export const getDate = (str?: string | number): Date => {
  let newDate
  const re = /^[\d]+$/
  if (str) {
    if (typeof str === 'number')
      str = `${str}`
    try {
      if (re.test(str)) {
        if (str.length === 10)
          newDate = new Date(Number(`${str}000`))
        else if (str.length === 13)
          newDate = new Date(Number(str))
      }
      else {
        str = str.replace(/-/g, '/').replace('.000000', '')
        newDate = new Date(str)
      }
    }
    catch (error) {

    }
  }
  if (!newDate)
    newDate = new Date()

  return newDate
}

/**
 * 某时间和当前时间的间隔
 * @param publishTime 时间戳: 10位时间戳/13位时间戳/任何时间格式
 * @returns string
 */
export const getDateDiff = (time: string): string => {
  const timeNow = Math.floor(new Date().getTime() / 1000)
  const timeNowYear = new Date().getFullYear()

  const date = getDate(time)
  const publishTime = date.getTime() / 1000

  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  // const s = date.getSeconds()

  const d = timeNow - publishTime
  const d_days = Math.floor(d / 86400)
  const d_hours = Math.floor(d / 3600)
  const d_minutes = Math.floor(d / 60)
  const d_seconds = d

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
  else if (d_days >= 3 && timeNowYear === Y) {
    return `${M < 10 ? '0' : ''}${M}-${D < 10 ? '0' : ''}${D} ${H < 10 ? '0' : ''}${H}:${m < 10 ? '0' : ''}${m}`
  }
  else if (timeNowYear !== Y) {
    return `${Y}-${M < 10 ? '0' : ''}${M}-${D < 10 ? '0' : ''}${D} ${H < 10 ? '0' : ''}${H}:${m < 10 ? '0' : ''}${m}`
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

  let newDate = getDate(utc)

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
