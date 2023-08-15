/**
 * 输入 Guard 以过滤出近似为空的值
 *
 * @category Guards
 * @example array.filter(notNullish)
 */
export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
    return v != null
}

/**
 * 输入 Guard 以过滤空值
 *
 * @category Guards
 * @example array.filter(noNull)
 */
export function noNull<T>(v: T | null): v is Exclude<T, null> {
    return v !== null
}

/**
 * 输入 guard 以过滤出近似为空的值
 *
 * @category Guards
 * @example array.filter(notUndefined)
 */
export function notUndefined<T>(v: T): v is Exclude<T, undefined> {
    return v !== undefined
}

/**
 * 输入 guard 过滤掉虚假值
 *
 * @category Guards
 * @example array.filter(isTruthy)
 */
export function isTruthy<T>(v: T): v is NonNullable<T> {
    return Boolean(v)
}
