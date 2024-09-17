import type { Nullable } from './types'

/**
 * 获取当前时间戳
 * 该函数没有参数。
 * @returns 返回当前的毫秒级时间戳
 */
export function timestamp() {
    // 使用Date.now()获取当前时间戳，并通过+运算符将其转换为数字类型
    return +Date.now()
}

/**
 * 根据给定的字符串或数值获取一个Date对象。
 * - 如果提供字符串，尝试解析该字符串为日期，支持多种格式，例如'2021-01-01'或'20210101'等。
 * - 如果提供数值，将其视为毫秒数创建Date对象。
 * - 如果未提供参数，返回当前日期和时间的Date对象。
 *
 * @param str 可选参数，为字符串或数值类型的日期表示。
 * @returns 返回一个Date对象，要么根据提供的参数解析得到，要么返回当前日期和时间的Date对象。
 */
export function getDate(str?: string | number): Date {
    let newDate: Nullable<Date> = null
    const re = /^\d+$/

    // 根据输入类型尝试解析日期
    if (str) {
        if (typeof str === 'number') {
            str = `${str}`
        }
        try {
            // 如果输入是数字格式，尝试根据长度判断是日期还是时间戳
            if (re.test(str)) {
                if (str.length === 10) {
                    newDate = new Date(Number(`${str}000`)) // 处理YYYYMMDD格式，转换为毫秒数
                }
                else if (str.length === 13) {
                    newDate = new Date(Number(str)) // 直接将13位数字作为毫秒数创建日期
                }
            }
            else {
                // 处理字符串格式的日期，替换分隔符并去除毫秒部分
                str = str.replace(/-/g, '/').replace('.000000', '')
                newDate = new Date(str)
            }
        }
        catch (_error) {
            // 解析失败时，默认创建当前日期的Date对象
            newDate = new Date()
        }
    }
    // 如果解析结果为null，则默认返回当前日期的Date对象
    if (!newDate) {
        newDate = new Date()
    }

    return newDate
}

/**
 * 计算并返回与指定时间的差异。
 *
 * @param time 指定的时间，格式为字符串。
 * @returns 返回与指定时间的差异描述字符串。根据时间差，返回的字符串格式可以是天数、小时数、分钟数、秒数，
 *          或者如果时间差非常小，则返回"刚刚"。如果无法计算差异，则返回空字符串。
 */
export function getDateDiff(time: string): string {
    // 获取当前时间的时间戳（秒）
    const timeNow = Math.floor(new Date().getTime() / 1000)
    // 获取当前年份
    const timeNowYear = new Date().getFullYear()

    // 解析指定时间
    const date = getDate(time)
    // 获取指定时间的时间戳（秒）
    const publishTime = date.getTime() / 1000

    // 获取指定时间的年、月、日、时、分
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = date.getHours()
    const m = date.getMinutes()

    // 计算时间差（秒）
    const d = timeNow - publishTime
    // 计算时间差对应的天、小时、分钟、秒
    const d_days = Math.floor(d / 86400)
    const d_hours = Math.floor(d / 3600)
    const d_minutes = Math.floor(d / 60)
    const d_seconds = d

    // 根据时间差返回相应的字符串描述
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
        if (d_seconds <= 0) {
            return '刚刚'
        }

        return `${d_seconds}秒前`
    }
    else if (d_days >= 3 && timeNowYear === Y) {
        // 当年且时间差大于等于3天，返回月-日 格式
        return `${M < 10 ? '0' : ''}${M}-${D < 10 ? '0' : ''}${D} ${H < 10 ? '0' : ''}${H}:${m < 10 ? '0' : ''}${m}`
    }
    else if (timeNowYear !== Y) {
        // 非当年，返回年-月-日 格式
        return `${Y}-${M < 10 ? '0' : ''}${M}-${D < 10 ? '0' : ''}${D} ${H < 10 ? '0' : ''}${H}:${m < 10 ? '0' : ''}${m}`
    }
    // 如果都无法匹配，返回空字符串
    return ''
}

/**
 * 将UTC时间转换为指定格式的日期字符串。
 * @param utc 可以是UTC时间的字符串或数值。
 * @param format 指定输出的日期格式，默认为'yyyy-mm-dd'， 格式 yyyy-mm-dd hh:ii:ss.SSS | yyyy-m-d h:i:s.S。
 * @param add 可选参数，用于指定要添加到日期上的天数。
 * @returns 返回转换后的日期字符串。
 */
export function UTC2Date(utc?: string | number, format?: string, add?: number): string {
    // 设置默认日期格式
    if (!format) {
        format = 'yyyy-mm-dd'
    }

    // 获取日期对象
    let newDate = getDate(utc)

    // 如果添加了天数，则对日期进行调整
    if (add) {
        newDate = new Date(newDate.setDate(newDate.getDate() + add))
    }

    // 获取日期的年、月、日、时、分、秒和毫秒
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    const hour = newDate.getHours()
    const minute = newDate.getMinutes()
    const second = newDate.getSeconds()
    const millisecond = newDate.getMilliseconds()

    // 将月份格式化为两位数
    const monthString = month < 10 ? `0${month}` : `${month}`

    // 根据指定格式返回日期字符串
    return format
        .replace('yyyy', `${year}`)
        .replace('mm', monthString)
        .replace('m', `${month}`)
        .replace('dd', `${(day < 10 ? '0' : '') + day}`)
        .replace('d', `${day}`)
        .replace('hh', `${(hour < 10 ? '0' : '') + hour}`)
        .replace('h', `${hour}`)
        .replace('ii', `${(minute < 10 ? '0' : '') + minute}`)
        .replace('i', `${minute}`)
        .replace('ss', `${(second < 10 ? '0' : '') + second}`)
        .replace('s', `${second}`)
        .replace('SSS', `${(millisecond < 100 ? '0' : '') + (millisecond < 10 ? '0' : '') + millisecond}`)
        .replace('S', `${millisecond}`)
}

/**
 * 函数用于计算两个时间戳之间的差值，并返回以天、小时、分钟、秒的形式表示的时间差。
 * @param timestamp1 第一个时间戳，格式为字符串。
 * @param timestamp2 第二个时间戳，格式为字符串。
 * @returns 返回一个数组，包含天、小时、分钟、秒以及格式化后的小时、分钟和秒字符串。
 */
export function subtractTimestamps(timestamp1: string, timestamp2: string): [number, number, number, number, string, string, string] {
    // 将时间戳字符串转换为Date对象
    const date1 = getDate(timestamp1)
    const publishTime1 = date1.getTime()

    const date2 = getDate(timestamp2)
    const publishTime2 = date2.getTime()

    // 计算两个时间之间的毫秒差
    const millisecondsDiff = Math.abs(publishTime2 - publishTime1)

    // 毫秒转换为秒、分钟、小时和天
    const seconds = Math.floor(millisecondsDiff / 1000)
    const minutes = Math.floor(seconds / 60) % 60
    const hours = Math.floor(seconds / 3600) % 24
    const days = Math.floor(seconds / 86400)

    // 秒数取余，用于返回未格式化的秒数
    const s = seconds % 60

    // 将小时、分钟和秒格式化为两位数字符串
    const HH = hours < 10 ? `0${hours}` : `${hours}`
    const MM = minutes < 10 ? `0${minutes}` : `${minutes}`
    const SS = s < 10 ? `0${s}` : `${s}`

    return [days, hours, minutes, s, HH, MM, SS]
}
