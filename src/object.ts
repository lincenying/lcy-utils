import { notNullish } from './guards'
import { isObject } from './is'
import type { DeepMerge } from './types'

/**
 * 映射一个对象的键/值对，并构造一个新的
 *
 *
 * @category Object
 *
 * Transform:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [k.toString().toUpperCase(), v.toString()])
 * // { A: '1', B: '2' }
 * ```
 *
 * Swap key/value:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => [v, k])
 * // { 1: 'a', 2: 'b' }
 * ```
 *
 * Filter keys:
 * @example
 * ```
 * objectMap({ a: 1, b: 2 }, (k, v) => k === 'a' ? undefined : [k, v])
 * // { b: 2 }
 * ```
 */
export function objectMap<K extends string, V, NK = K, NV = V>(obj: Record<K, V>, fn: (key: K, value: V) => [NK, NV] | undefined): Record<K, V> {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => fn(k as K, v as V))
      .filter(notNullish),
  )
}

/**
 * Type guard for any key, `k`.
 * Marks `k` as a key of `T` if `k` is in `obj`.
 *
 * @category Object
 * @param obj object to query for key `k`
 * @param k key to check existence in `obj`
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}

/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

/**
 * 深度对比对象
 * @param a 对象1
 * @param b 对象2
 * @returns true | false
 */
export function deepEqual<T>(a: T, b: T): boolean {
  if (a === b)
    return true

  if (typeof a !== typeof b || a === null || b === null || Array.isArray(a) !== Array.isArray(b))
    return false

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length)
      return false

    for (const key of keysA) {
      const valA = a[key as keyof typeof a]
      const valB = b[key as keyof typeof b]
      if (!deepEqual(valA, valB))
        return false
    }

    return true
  }

  return false
}

/**
 * 深度克隆对象
 */
export function deepClone<T extends Record<string, any>>(obj: T): T {
  if (obj === null || typeof obj !== 'object')
    return obj

  const isArray = Array.isArray(obj)
  const clone = (isArray ? [] : {}) as T

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      clone[key] = deepClone(value)
    }
  }

  return clone as T
}

/**
 * 对象深度合并 :P
 *
 * @category Object
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
  if (!sources.length)
    return target as any

  const source = sources.shift()
  if (source === undefined)
    return target as any

  if (isMergableObject(target) && isMergableObject(source)) {
    objectKeys(source).forEach((key) => {
      // @ts-expect-error
      if (isMergableObject(source[key])) {
        // @ts-expect-error
        if (!target[key])
          // @ts-expect-error
          target[key] = {}

        // @ts-expect-error
        if (isMergableObject(target[key])) {
          // @ts-expect-error
          deepMerge(target[key], source[key])
        }
        else {
          // @ts-expect-error
          target[key] = source[key]
        }
      }
      else {
        // @ts-expect-error
        target[key] = source[key]
      }
    })
  }

  return deepMerge(target, ...sources)
}

function isMergableObject(item: any): item is Object {
  return isObject(item) && !Array.isArray(item)
}

/**
 * 通过给键名创建一个新的子集对象
 *
 * @category Object
 * @example
 * ```
 * objectPick({ a:1, b:2, c:3, d:4 }, ['a', 'b']) // {a: 1, b: 2}
 * ```
 */
export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k]
    }
    return n
  }, {} as Pick<O, T>)
}

/**
 * 清除对象中未定义的字段。 会改变原对象
 *
 * @category Object
 * @example
 * ```
 * clearUndefined({ a: undefined, b:2, c:3, d:4 }) // {b: 2, c: 3, d: 4}
 * ```
 */
export function clearUndefined<T extends object>(obj: T): T {
  // @ts-expect-error
  Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
  return obj
}

/**
 * Determines whether an object has a property with the specified name
 *
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 * @category Object
 */
export function hasOwnProperty<T>(obj: T, v: PropertyKey) {
  if (obj == null)
    return false
  return Object.prototype.hasOwnProperty.call(obj, v)
}
