import { toString } from './base'

export function isDef<T = any>(val?: T): val is T {
  return typeof val !== 'undefined'
}
export function isBoolean(val: any): val is boolean {
  return typeof val === 'boolean'
}
export function isFunction<T extends Function>(val: any): val is T {
  return typeof val === 'function'
}
export const isInt = Number.isInteger
export const isArray = Array.isArray
export function isNumber(val: any): val is number {
  return typeof val === 'number'
}
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
export function isObject(val: any): val is object {
  return toString(val) === '[object Object]'
}
export function isUndefined(val: any): val is undefined {
  return toString(val) === '[object Undefined]'
}
export function isNull(val: any): val is null {
  return toString(val) === '[object Null]'
}
export function isRegExp(val: any): val is RegExp {
  return toString(val) === '[object RegExp]'
}
export function isDate(val: any): val is Date {
  return toString(val) === '[object Date]'
}
export function isMap(val: any): val is Map<any, any> {
  return toString(val) === '[object Map]'
}
export function isSet(val: any): val is Set<any> {
  return toString(val) === '[object Set]'
}
export function isPromise<T = any>(obj: any): obj is Promise<T> {
  return obj && typeof obj.then === 'function'
}

// @ts-ignore
export function isWindow(val: any): boolean {
  return typeof window !== 'undefined' && toString(val) === '[object Window]'
}
// @ts-ignore
export const isBrowser = typeof window !== 'undefined'

/**
 * 检测是否为空, 空对象/空数组/空字符串 均为真
 * @param payload
 * @returns true | false
 */
function _isEmpty(payload: any) {
  if (isObject(payload) && Object.keys(payload).length === 0)
    return true
  else if (Array.isArray(payload) && payload.length === 0)
    return true
  else if (payload === '' || isUndefined(payload) || isNull(payload))
    return true
  return false
}

/**
 * 检测是否为空, 非数值型和布尔型 且 是空对象/空数组/空字符串 则为真
 * @param payload
 * @returns true | false
 */
export function isEmpty(payload: any): boolean {
  return !isNumber(payload) && !isBoolean(payload) && _isEmpty(payload)
}

/**
 * 检测是否为假, 布尔假 或者 是空对象/空数组/空字符串 则为真
 * @param payload
 * @returns true | false
 */
export function isFalse(payload: any): boolean {
  return !!payload === false || (!isBoolean(payload) && !isNumber(payload) && _isEmpty(payload))
}
