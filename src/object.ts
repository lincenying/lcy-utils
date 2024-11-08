import type { DeepMerge } from './types'
import { isDeepEqual } from './equal'
import { notNullish } from './guards'
import { isObject } from './is'

/**
 * 检查一个键是否为给定对象的键。
 * @param obj - 一个泛型对象T。
 * @param k - 需要检查的键。
 * @returns 返回一个布尔值，表示k是否为obj的键。
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
    return k in obj // 检查k是否存在于对象obj中
}

/**
 * 清除对象中值为undefined的属性。
 * @param obj 要处理的对象。
 * @returns 处理后的对象，不包含值为undefined的属性。
 * @example
 * ```
 * clearUndefined({ a: undefined, b:2, c:3, d:4 }) // {b: 2, c: 3, d: 4}
 * ```
 */
export function clearUndefined<T extends object>(obj: T): T {
    // 遍历对象的每个属性，若值为undefined，则删除该属性
    // @ts-expect-error 通过!
    Object.keys(obj).forEach((key: string) => (obj[key] === undefined ? delete obj[key] : {}))
    return obj
}

/**
 * 深度克隆对象。
 * @param obj 要进行深度克隆的对象，该对象必须是包含属性的记录类型。
 * @returns 返回一个与传入对象属性相同的新对象，新对象不会与原对象共享引用。
 */
export function deepClone<T extends Record<string, any>>(obj: T): T {
    // 如果对象为null或不是对象类型，则直接返回该对象
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // 判断对象是否为数组
    const isArray = Array.isArray(obj)
    // 创建一个空的克隆对象，如果是数组则创建空数组
    const clone = (isArray ? [] : {}) as T

    // 遍历对象的所有属性
    for (const key in obj) {
        // 确保只处理对象自有的属性，排除原型链上的属性
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key]
            // 递归克隆对象的每个属性，确保深度克隆
            clone[key] = deepClone(value)
        }
    }

    // 返回克隆出的新对象
    return clone as T
}

/**
 * 检查两个值是否深度相等。
 * @param a 第一个要比较的值。
 * @param b 第二个要比较的值。
 * @returns 如果两个值深度相等则返回true，否则返回false。
 */
export function deepEqual<T>(a: T, b: T): boolean {
    return isDeepEqual(a, b) // 调用isDeepEqual函数进行深度比较
}

/**
 * 深度合并对象。
 * @param target 目标对象，合并的起点。
 * @param sources 源对象，一个或多个将被合并到目标对象的对象。
 * @returns 返回合并后的对象。
 */
export function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
    // 没有源对象时直接返回目标对象
    if (!sources.length) {
        return target as any
    }

    // 获取第一个源对象
    const source = sources.shift()
    // 如果第一个源对象为undefined，也直接返回目标对象
    if (source === undefined) {
        return target as any
    }

    // 当目标对象和源对象都是可合并对象时进行合并
    if (isMergableObject(target) && isMergableObject(source)) {
        objectKeys(source).forEach((key) => {
            // 跳过特定的键，如原型链相关的键
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return
            }

            // 如果源键值对是可合并的，则递归合并
            // @ts-expect-error 通过!
            if (isMergableObject(source[key])) {
                // @ts-expect-error 通过!
                if (!target[key]) {
                    // @ts-expect-error 通过!
                    target[key] = {}
                }

                // @ts-expect-error 通过!
                if (isMergableObject(target[key])) {
                    deepMerge(target[key], source[key])
                }
                else {
                    // @ts-expect-error 通过!
                    target[key] = source[key]
                }
            }
            else {
                // 直接覆盖非对象类型的键值对
                // @ts-expect-error 通过!
                target[key] = source[key]
            }
        })
    }

    // 继续合并剩余的源对象
    return deepMerge(target, ...sources)
}

/**
 * 深度合并对象，可以合并数组和普通对象。如果目标对象和源对象都是可合并的（即普通对象），则会递归合并它们的属性。
 * 数组会通过追加方式合并。
 * @param target 目标对象，合并的起点。
 * @param sources 源对象数组，将这些对象的属性合并到目标对象中。
 * @returns 返回合并后的对象。如果没有任何源对象提供，则返回目标对象。
 */
export function deepMergeWithArray<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S> {
    // 没有源对象时直接返回目标对象
    if (!sources.length) {
        return target as any
    }

    // 获取第一个源对象进行合并
    const source = sources.shift()
    // 如果第一个源对象为undefined，则返回目标对象
    if (source === undefined) {
        return target as any
    }

    // 当目标对象和源对象都是数组时，进行数组合并
    if (Array.isArray(target) && Array.isArray(source)) {
        target.push(...source)
    }

    // 当目标对象和源对象都是可合并对象时，进行深度合并
    if (isMergableObject(target) && isMergableObject(source)) {
        objectKeys(source).forEach((key) => {
            // 跳过特定的属性，如原型链上的属性
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return
            }

            // 递归合并数组或对象属性
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
                // 对于非对象/数组属性，直接覆盖
            // @ts-expect-error 通过!
                target[key] = source[key]
            }
            // @ts-check
        })
    }

    // 继续与剩余的源对象进行合并
    return deepMergeWithArray(target, ...sources)
}

/**
 * 检查对象是否拥有指定的属性。
 * @param obj 要检查的对象。
 * @param v 要检查的属性键，可以是字符串或符号。
 * @returns 如果对象拥有指定的属性，则返回true；否则返回false。
 * @see https://eslint.org/docs/rules/no-prototype-builtins
 */
export function hasOwnProperty<T>(obj: T, v: PropertyKey) {
    // 当对象为null或undefined时，直接返回false
    if (obj == null) {
        return false
    }
    // 使用Object.prototype.hasOwnProperty确保检查的是对象自身属性，而不是继承来的属性
    return Object.prototype.hasOwnProperty.call(obj, v)
}

/**
 * 检查一个项是否为可以合并的对象。
 * @param item 任意类型的项，需要被检查是否为可合并的对象。
 * @returns 返回一个布尔值，如果该项是对象而不是数组，则为true；否则为false。
 */
function isMergableObject(item: any): item is object {
    // 检查项是否为对象且不是数组
    return isObject(item) && !Array.isArray(item)
}

/**
 * 将对象转换为包含键值对的数组。
 * @param obj - 需要转换的对象。
 * @returns 返回一个数组，其中每个元素都是一个包含对象键和对应值的二元组。
 */
export function objectEntries<T extends object>(obj: T) {
    // 将对象的键值对转换为数组形式
    return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

/**
 * 获取对象中所有可枚举属性的键名数组。
 * @param obj - 一个泛型对象，泛型T必须扩展自object类型。
 * @returns 返回一个数组，数组中的元素类型为`keyof T & (string | number | boolean | null | undefined)`，
 *          即对象键名的字符串形式，保证键名类型安全。
 */
export function objectKeys<T extends object>(obj: T) {
    // 使用Object.keys获取对象的键名数组，并通过类型断言确保返回的数组元素类型符合特定的约束。
    return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

/**
 * 对象映射函数，将给定对象的键值对通过提供的函数处理后，生成新的对象。
 * @param obj - 输入的对象，其键值对将被遍历。
 * @param fn - 处理函数，接收当前键和值作为参数，返回新的键值对数组。如果返回`undefined`，则当前键值对不会被包含在输出对象中。
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
 * @returns 返回一个新的对象，其键值对是通过处理函数`fn`处理后的结果。
 */
export function objectMap<K extends string, V, NK = K, NV = V>(obj: Record<K, V>, fn: (key: K, value: V) => [NK, NV] | undefined): Record<K, V> {
    // 通过Object.entries将对象转换为键值对数组，然后映射每个键值对并通过处理函数fn进行处理
    return Object.fromEntries(
        Object.entries(obj)
            .map(([k, v]) => fn(k as K, v as V)) // 应用处理函数
            .filter(notNullish), // 过滤掉fn返回undefined的键值对
    )
}

/**
 * 从对象中选择指定的属性。
 * @param obj 要选择属性的对象。
 * @param keys 要选择的属性的键名数组。
 * @param omitUndefined 是否忽略值为undefined的属性，默认为false。
 * @returns 返回一个新对象，包含指定的对象中选择出来的属性。
 * @example
 * ```
 * objectPick({ a:1, b:2, c:3, d:4 }, ['a', 'b']) // {a: 1, b: 2}
 * ```
 */
export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false) {
    // 使用reduce方法遍历keys数组，构建一个包含指定键的新对象
    return keys.reduce((n, k) => {
        // 如果键存在于原对象中
        if (k in obj) {
            // 如果不允许忽略undefined值，或当前值不为undefined，则添加到新对象中
            if (!omitUndefined || obj[k] !== undefined) {
                n[k] = obj[k]
            }
        }
        return n
    }, {} as Pick<O, T>) // 初始化为空对象，并通过类型断言指定其类型
}
