import type { Fn, Nullable } from './types'

/**
 * 调用数组中的每个函数
 */
export function batchInvoke(functions: Nullable<Fn>[]) {
    functions.forEach(fn => fn && fn())
}

/**
 * 调用函数
 */
export function invoke(fn: Fn) {
    return fn()
}

/**
 * 通过回调传值，并返回值
 *
 * @example
 * ```
 * function createUser(name: string): User {
 *   return tap(new User, user => {
 *     user.name = name
 *   })
 * }
 * ```
 */
export function tap<T>(value: T, callback: (value: T) => void): T {
    callback(value)
    return value
}
