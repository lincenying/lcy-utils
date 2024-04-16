import { isDeepEqual } from './equal'
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
    return isDeepEqual(a, b)
}

/**
 * 深度克隆对象
 */
export function deepClone<T extends Record<string, any>>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

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
 * 第一个参数是目标对象，其余参数是源对象。
 * 目标对象将被改变并返回
 *
 * @category Object
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
    if (!sources.length) {
        return target as any
    }

    const source = sources.shift()
    if (source === undefined) {
        return target as any
    }

    if (isMergableObject(target) && isMergableObject(source)) {
        objectKeys(source).forEach((key) => {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return
            }

            // @ts-expect-error 通过!
            if (isMergableObject(source[key])) {
                // @ts-expect-error 通过!
                if (!target[key]) {
                    // @ts-expect-error 通过!
                    target[key] = {}
                }

                // @ts-expect-error 通过!
                if (isMergableObject(target[key])) {
                    // @ts-expect-error 通过!
                    deepMerge(target[key], source[key])
                }
                else {
                    // @ts-expect-error 通过!
                    target[key] = source[key]
                }
            }
            else {
                // @ts-expect-error 通过!
                target[key] = source[key]
            }
        })
    }

    return deepMerge(target, ...sources)
}

/**
 * 深度合并
 *
 * 与“deepMerge”的不同之处在于它合并数组而不是覆盖它们。
 *
 * 第一个参数是目标对象，其余参数是源对象。
 * 目标对象将被改变并返回
 *
 * @category Object
 */
export function deepMergeWithArray<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
    if (!sources.length) {
        return target as any
    }

    const source = sources.shift()
    if (source === undefined) {
        return target as any
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        target.push(...source)
    }

    if (isMergableObject(target) && isMergableObject(source)) {
        objectKeys(source).forEach((key) => {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return
            }

            // @ts-expect-error 通过!
            if (Array.isArray(source[key])) {
                // @ts-expect-error 通过!
                if (!target[key]) {
                    // @ts-expect-error 通过!
                    target[key] = []
                }

                // @ts-expect-error 通过!
                deepMergeWithArray(target[key], source[key])
            }
            // @ts-expect-error 通过!
            else if (isMergableObject(source[key])) {
                // @ts-expect-error 通过!
                if (!target[key]) {
                    // @ts-expect-error 通过!
                    target[key] = {}
                }

                // @ts-expect-error 通过!
                deepMergeWithArray(target[key], source[key])
            }
            else {
                // @ts-expect-error 通过!
                target[key] = source[key]
            }
        })
    }

    return deepMergeWithArray(target, ...sources)
}

function isMergableObject(item: any): item is object {
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
            if (!omitUndefined || obj[k] !== undefined) {
                n[k] = obj[k]
            }
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
    // @ts-expect-error 通过!
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
    if (obj == null) {
        return false
    }
    return Object.prototype.hasOwnProperty.call(obj, v)
}
