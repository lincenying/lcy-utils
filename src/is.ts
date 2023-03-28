import { toString } from './base'

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isFunction = <T extends Function> (val: any): val is T => typeof val === 'function'
export const isInt = Number.isInteger
export const isNumber = (val: any): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isObject = (val: any): val is object => toString(val) === '[object Object]'
export const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'
export const isNull = (val: any): val is null => toString(val) === '[object Null]'
export const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'
export const isDate = (val: any): val is Date => toString(val) === '[object Date]'

// @ts-ignore
export const isWindow = (val: any): boolean => typeof window !== 'undefined' && toString(val) === '[object Window]'
// @ts-ignore
export const isBrowser = typeof window !== 'undefined'

const _isEmpty = (payload: any) => {
  if (isObject(payload) && Object.keys(payload).length === 0)
    return true
  else if (Array.isArray(payload) && payload.length === 0)
    return true
  else if (payload === '' || isUndefined(payload) || isNull(payload))
    return true
  return false
}

export const isEmpty = (payload: any): boolean => {
  return !isNumber(payload) && !isBoolean(payload) && _isEmpty(payload)
}

export const isFalse = (payload: any): boolean => {
  return !!payload === false || (!isBoolean(payload) && !isNumber(payload) && _isEmpty(payload))
}
