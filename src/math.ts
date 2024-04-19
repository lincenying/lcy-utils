import { flattenArrayable } from './array'

/**
 * 计算传入参数的总和。
 * 该函数接受一个或多个数字参数，包括一维数组或二维数组，然后将所有数字相加得出总和。
 *
 * @param args 可以是数字的序列（一维数组或二维数组）。
 * @returns 返回所有输入数字的总和。
 * @example
 * ```
 * sum(1,2,3,4)
 * sum([1,2,3,4])
 * ```
 */
export function sum(...args: number[] | number[][]) {
    // 将输入的参数扁平化后，reduce方法用于累加所有数字
    return flattenArrayable(args).reduce((a, b) => a + b, 0)
}
