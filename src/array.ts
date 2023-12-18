import type { Arrayable, Nullable } from './types'

export function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n))
}
/**
 * Convert `Arrayable<T>` to `Array<T>`
 *
 * @category Array
 */
export function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T> {
    array = array ?? []
    return Array.isArray(array) ? array : [array]
}

/**
 * Convert `Arrayable<T>` to `Array<T>` and flatten it
 *
 * @category Array
 */
export function flattenArrayable<T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> {
    return toArray(array).flat(1) as Array<T>
}

/**
 * 使用 rest 参数合并数组
 *
 * @category Array
 */
export function mergeArrayable<T>(...args: Nullable<Arrayable<T>>[]): Array<T> {
    return args.flatMap(i => toArray(i))
}

export type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any

/**
 * 用过滤器函数将数组分成两部分
 *
 * @category Array
 * @example const [odd, even] = partition([1, 2, 3, 4], i => i % 2 != 0)
 */
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>): [T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>): [T[], T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>): [T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>): [T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>, f6: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], ...filters: PartitionFilter<T>[]): any {
    const result: T[][] = Array.from({ length: filters.length + 1 }).fill(null).map(() => [])

    array.forEach((e, idx, arr) => {
        let i = 0
        for (const filter of filters) {
            if (filter(e, idx, arr)) {
                result[i].push(e)
                return
            }
            i += 1
        }
        result[i].push(e)
    })
    return result
}

/**
 * 去除数组里的重复数据
 *
 * @category Array
 */
export function uniq<T>(array: readonly T[]): T[] {
    return Array.from(new Set(array))
}

/**
 * 用自定义的相等函数唯一一个数组
 *
 * @category Array
 */
export function uniqueBy<T>(array: readonly T[], equalFn: (a: any, b: any) => boolean): T[] {
    return array.reduce((acc: T[], cur: any) => {
        const index = acc.findIndex((item: any) => equalFn(cur, item))
        if (index === -1)
            acc.push(cur)
        return acc
    }, [])
}

/**
 * 获取数组最后一项
 *
 * @category Array
 */
export function last(array: readonly []): undefined
export function last<T>(array: readonly T[]): T
export function last<T>(array: readonly T[]): T | undefined {
    return at(array, -1)
}

/**
 * 从数组中移除一项
 *
 * @category Array
 */
export function remove<T>(array: T[], value: T) {
    if (!array)
        return false
    const index = array.indexOf(value)
    if (index >= 0) {
        array.splice(index, 1)
        return true
    }
    return false
}

/**
 * 获取数组的第n项。负数为反向
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
    const len = array.length
    if (!len)
        return undefined

    if (index < 0)
        index += len

    return array[index]
}

/**
 * 生成一个范围数组的数字。“stop”是专属的。
 *
 * @category Array
 */
export function range(stop: number): number[]
export function range(start: number, stop: number, step?: number): number[]
export function range(...args: any): number[] {
    let start: number, stop: number, step: number

    if (args.length === 1) {
        start = 0
        step = 1;
        ([stop] = args)
    }
    else {
        ([start, stop, step = 1] = args)
    }

    const arr: number[] = []
    let current = start
    while (current < stop) {
        arr.push(current)
        current += step || 1
    }

    return arr
}

/**
 * 移动数组中的元素
 *
 * @category Array
 * @param arr
 * @param from
 * @param to
 */
export function move<T>(arr: T[], from: number, to: number) {
    arr.splice(to, 0, arr.splice(from, 1)[0])
    return arr
}

/**
 * 将数字限制在数组的索引范围内
 *
 * @category Array
 */
export function clampArrayRange(n: number, arr: readonly unknown[]) {
    return clamp(n, 0, arr.length - 1)
}

/**
 * 从数组中获取随机项
 *
 * @param arr
 * @param quantity - quantity of random items which will be returned
 */
export function sample<T>(arr: T[], quantity: number) {
    return Array.from({ length: quantity }, _ => arr[Math.round(Math.random() * (arr.length - 1))])
}

/**
 * 打乱一个数组。 这个函数改变原数组。
 *
 * @category Array
 */
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

/**
 * 数组转对象
 * @param arr 数组
 * @param key
 * @param val
 * @returns object
 * @example
 * ```
 * arrayToObject([{name: "AAA", value: 1}, {name: "BBB", value: 2}], 'name', 'value')
 * // { 1:"AAA", 2:"BBB", 3:"CCC", 4:"DDD" }
 * ```
 */
export function arrayToObject(arr: any[], key = 'value', val = 'name') {
    const obj: Record<string, string | number> = {}
    arr.forEach((item) => {
        obj[item[key]] = item[val]
    })
    return obj
}
