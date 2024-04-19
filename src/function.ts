import type { Fn, Nullable } from './types'

/**
 * 批量调用函数数组中的每个函数。
 * @param functions 可空的函数数组，数组中的每个元素都应为函数类型。
 */
export function batchInvoke(functions: Nullable<Fn>[]) {
    // 遍历函数数组，对于数组中的每个非空函数，执行该函数
    functions.forEach(fn => fn && fn())
}

/**
 * 调用一个给定的函数并返回其结果。
 * @param fn - 一个函数，该函数将被调用并返回其执行结果。
 * @returns 调用给定函数后的返回值。
 */
export function invoke(fn: Fn) {
    return fn()
}

/**
 * 该函数接受一个值和一个回调函数作为参数，然后执行回调函数，将值作为参数传递给回调函数，最后返回原始值。
 * @param value 任意类型的值，将作为参数传递给回调函数。
 * @param callback 一个以 value 为参数的回调函数，该函数将在调用 tap 函数时执行。
 * @returns 返回与传入的 value 参数相同的值。
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
    callback(value) // 执行回调函数，传入value作为参数
    return value // 返回原始值
}
