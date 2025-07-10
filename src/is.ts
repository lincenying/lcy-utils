import { toString } from './base'

/**
 * 检查一个值是否定义（不是undefined）。
 * @param val 任意类型的值，可以是未定义的。
 * @returns 返回一个布尔值，如果值已定义则为true，否则为false。
 */
export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'

/**
 * 检查一个值是否为布尔值。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是布尔型则为true，否则为false。
 */
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'

/**
 * 检查一个值是否为函数。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是函数则为true，否则为false。
 */
export const isFunction = <T extends () => void> (val: any): val is T => typeof val === 'function'

/**
 * 检查一个值是否为整数。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是整数则为true，否则为false。
 */
export const isInt = Number.isInteger

/**
 * 检查一个值是否为数组。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是数组则为true，否则为false。
 */
export const isArray = Array.isArray

/**
 * 检查一个值是否为数字。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是数字则为true，否则为false。
 */
export const isNumber = (val: any): val is number => typeof val === 'number'

/**
 * 检查一个值是否为字符串。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是字符串则为true，否则为false。
 */
export const isString = (val: unknown): val is string => typeof val === 'string'

/**
 * 检查一个值是否为对象（排除null）。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是对象则为true，否则为false。
 */
export const isObject = (val: any): val is object => toString(val) === '[object Object]'

/**
 * 检查一个值是否为undefined。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值为undefined则为true，否则为false。
 */
export const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'

/**
 * 检查一个值是否为null。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值为null则为true，否则为false。
 */
export const isNull = (val: any): val is null => toString(val) === '[object Null]'

/**
 * 检查一个值是否为正则表达式。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是正则表达式则为true，否则为false。
 */
export const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'

/**
 * 检查一个值是否为日期对象。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是日期对象则为true，否则为false。
 */
export const isDate = (val: any): val is Date => toString(val) === '[object Date]'

/**
 * 检查一个值是否为Map对象。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是Map对象则为true，否则为false。
 */
export const isMap = (val: any): val is Map<any, any> => toString(val) === '[object Map]'

/**
 * 检查一个值是否为Set对象。
 * @param val 任意值。
 * @returns 返回一个布尔值，如果该值是Set对象则为true，否则为false。
 */
export const isSet = (val: any): val is Set<any> => toString(val) === '[object Set]'
/**
 * 检查一个对象是否为Promise。
 * @param obj 要检查的对象。
 * @returns 返回一个布尔值，表示该对象是否为Promise。
 */
export function isPromise<T = any>(obj: any): obj is Promise<T> {
    // 检查obj是否非空且具有then方法，以判断其是否为Promise
    return obj && typeof obj.then === 'function'
}

/**
 * 检查给定的字符串是否为有效的电子邮件地址
 * @param email 待检查的电子邮件地址
 * @returns 如果邮箱地址有效，返回true，否则返回false
 */
export function isEmail(email: string): boolean {
    const emailRegex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    return emailRegex.test(email)
}

/**
 * 检查给定的字符串是否为中国大陆的有效手机号码
 * @param phoneNumber 待检查的手机号码
 * @returns 如果手机号码有效，返回true，否则返回false
 */
export function isPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^1[3-9]\d{9}$/ // 匹配13到19开头的11位数字
    return phoneRegex.test(phoneNumber)
}

/**
 * 检查一个值是否为浏览器的window对象。
 * @param val 任意类型的值，将被检查是否为window对象。
 * @returns 返回一个布尔值，如果该值是window对象，则为true，否则为false。
 */
export const isWindow = (val: any): boolean => typeof window !== 'undefined' && toString(val) === '[object Window]'

/**
 * 判断当前环境是否为浏览器环境。
 * @returns 返回一个布尔值，如果是浏览器环境，则为true，否则为false。
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * 检测给定的值是否为空。
 * 空对象、空数组、空字符串、Null、Undefined都被视为空。
 * @param payload 待检测的值。
 * @returns 返回一个布尔值，如果检测到为空，则返回true，否则返回false。
 */
function _isEmpty(payload: any) {
    // 检测是否为空对象
    if (isObject(payload) && Object.keys(payload).length === 0) {
        return true
    }
    // 检测是否为空数组
    else if (Array.isArray(payload) && payload.length === 0) {
        return true
    }
    // 检测是否为空字符串、Undefined或Null
    else if (payload === '' || isUndefined(payload) || isNull(payload)) {
        return true
    }
    // 如果都不满足，则认为不为空
    return false
}

/**
 * 判断给定的传入值是否为空。
 * @param payload 任意类型的数据。
 * @returns 返回一个布尔值，如果传入值为空则为true，否则为false。
 */
export function isEmpty(payload: any): payload is null | undefined {
    // 先判断payload是否为数字或布尔值，若不是，则调用_isEmpty函数进一步判断是否为空
    return !isNumber(payload) && !isBoolean(payload) && _isEmpty(payload)
}

/**
 * 检查给定的传入值是否为假值。
 * @param payload 任意类型的值，作为检查的目标。
 * @returns 返回一个布尔值，如果传入值为假值或非布尔、非数字且为空的值，则返回 true；否则返回 false。
 */
export function isFalse(payload: any): payload is null | undefined {
    // 先通过双否运算符转换payload，再与false比较，等价于检查payload是否为false
    // 同时判断payload是否既不是布尔值也不是数字，并且为空
    return !!payload === false || (!isBoolean(payload) && !isNumber(payload) && _isEmpty(payload))
}
