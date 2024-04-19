/**
 * 检查给定的值是否不为null或undefined。
 * 该函数是一个类型守卫，用于在运行时确定值是否非空，
 * 并在类型系统中将类型缩小到非可空类型。
 *
 * @param v - 待检查的值，可以是任何类型T，包括null或undefined。
 * @returns 返回一个布尔值，如果值不为null或undefined，则为true；否则为false。
 */
export function notNullish<T>(v: T | null | undefined): v is NonNullable<T> {
    return v != null // 使用“!= null”运算符检查值是否非空
}

/**
 * 检查给定的值是否不为null，用于类型守卫
 * @param v 任意类型，可能是null
 * @returns 返回一个布尔值，如果值不为null，则为true；如果值为null，则为false。
 */
export function noNull<T>(v: T | null): v is Exclude<T, null> {
    return v !== null // 判断值是否不为null
}

/**
 * 检查一个值是否不是 undefined。
 * 该函数用于类型守卫，如果传入的值不是 undefined，则断言该值的类型为 T 中排除 undefined 的类型。
 *
 * @param v - 任意类型的值，需要被检查是否为 undefined。
 * @returns 返回一个布尔值，表示该值是否不是 undefined。如果是，则类型断言为 T 中排除 undefined 的类型。
 */
export function notUndefined<T>(v: T): v is Exclude<T, undefined> {
    return v !== undefined // 判断值是否不等于 undefined，是则类型守卫成功。
}

/**
 * 检查给定的值是否为真值（truthy）。
 * - 该函数通过通用类型参数 `T` 接收一个值 `v`。
 * - 返回一个布尔值，表示该值是否为非空（NonNullable）真值。
 *
 * @param v - 任意类型的值，该值将被检查是否为真。
 * @returns 返回一个布尔值，如果 `v` 是非空的真值，则为 `true`；否则为 `false`。
 */
export function isTruthy<T>(v: T): v is NonNullable<T> {
    return Boolean(v)
}
