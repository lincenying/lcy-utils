import { flattenArrayable } from './array'

export function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n))
}

/**
 * 求和
 * @param args 多个数值或数组
 * @returns number
 * @example
 * ```
 * sum(1,2,3,4)
 * sum([1,2,3,4])
 * ```
 */
export function sum(...args: number[] | number[][]) {
    return flattenArrayable(args).reduce((a, b) => a + b, 0)
}
