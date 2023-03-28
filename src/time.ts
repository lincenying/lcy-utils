export const timestamp = () => +Date.now()

export const getDateDiff = (publishTime: number): string => {
  const timeNow = parseInt(`${new Date().getTime() / 1000}`, 10)
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

// 日期格式化
export const UTC2Date = (utc: any, format?: string, add?: number): string => {
  if (!format)
    format = 'y-m-d'
  if (utc && typeof utc === 'string')
    utc = utc.replace(/-/g, '/').replace('.000000', '')
  let newDate = utc ? new Date(utc) : new Date()
  if (add)
    newDate = new Date(newDate.setDate(newDate.getDate() + add))
  const year: number | string = newDate.getFullYear()
  let month: number | string = newDate.getMonth() + 1
  let date: number | string = newDate.getDate()
  let hours: number | string = newDate.getHours()
  let minutes: number | string = newDate.getMinutes()
  let seconds: number | string = newDate.getSeconds()
  let secondes: number | string = newDate.getMilliseconds()
  month = month < 10 ? `0${month}` : month
  date = date < 10 ? `0${date}` : date
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  if (secondes < 100 && secondes > 9)
    secondes = `0${secondes}`

  else if (secondes < 10)
    secondes = `00${secondes}`

  return format
    .replace(/y/gi, `${year}`)
    .replace(/m/gi, `${month}`)
    .replace(/d/gi, `${date}`)
    .replace(/h/gi, `${hours}`)
    .replace(/i/gi, `${minutes}`)
    .replace(/s/gi, `${seconds}`)
    .replace(/v/gi, `${secondes}`)
}
