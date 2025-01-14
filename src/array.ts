import type { Arrayable, Nullable, Objable } from './types'

/**
 * 从数组中获取指定索引的元素。
 * @param array - 一个只读数组或空数组。
 * @param index - 要获取元素的索引，可以是正数或负数。负数索引从数组末尾开始计算。
 * 如果指定索引的元素存在，则返回该元素；如果索引超出范围或数组为空，则返回 `undefined`。
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
    const len = array.length // 获取数组长度
    if (!len) {
        return undefined // 如果数组为空，直接返回 undefined
    }

    if (index < 0) {
        index += len // 如果索引为负数，将其转换为从数组末尾开始的正数索引
    }

    return array[index] // 返回指定索引的元素
}

/**
 * 将数组转换为对象。该函数遍历输入数组中的每个元素，并使用指定的键（key）和值（val）构建一个对象。
 * @param arr 输入的数组，数组中的每个元素都应包含至少一个与`key`和`val`参数对应的属性。
 * @param key 用于作为新对象键的数组元素属性。默认值为'value'。
 * @param val 用于作为新对象值的数组元素属性。默认值为'name'。
 * @returns 返回一个对象，其中键由数组元素的`key`属性值决定，对应的值由数组元素的`val`属性值决定。
 * @example
 * ```
 * arrayToObject([{name: "AAA", value: 1}, {name: "BBB", value: 2}], 'name', 'value')
 * // { 1:"AAA", 2:"BBB", 3:"CCC", 4:"DDD" }
 * ```
 */
export function arrayToObject(arr: any[], key = 'value', val = 'name') {
    const obj: Objable<string | number> = {}
    // 遍历数组，将每个元素根据key和val构建一个对象
    arr.forEach((item) => {
        obj[item[key]] = item[val]
    })
    return obj
}

/**
 * 将给定的数值限制在指定的最小值和最大值之间。
 * @param n 要限制的数值。
 * @param min 允许的最小值。
 * @param max 允许的最大值。
 * @returns 返回经过限制后的数值，确保它不会小于最小值，也不会大于最大值。
 */
export function clamp(n: number, min: number, max: number) {
    // 使用Math.min和Math.max函数确保n的值不会超出指定的范围
    return Math.min(max, Math.max(min, n))
}

/**
 * 将指定的数字限制在数组的范围内。
 * @param n 要限制的数字。
 * @param arr 用于限制范围的数组，该数组是只读的。
 * @returns 返回限制后的数字，该数字将位于数组的起始位置和结束位置之间（包括起始位置，不包括结束位置）。
 */
export function clampArrayRange(n: number, arr: readonly unknown[]) {
    // 使用 clamp 函数将 n 限制在 0 和 arr.length - 1 之间
    return clamp(n, 0, arr.length - 1)
}

/**
 * 将可能嵌套的数组或数组元素转换为一维数组。
 *
 * @param array 可能为 null 的数组或数组的数组，或者数组的数组的元素。
 * @returns 返回一个转换后的一维数组。
 */
export function flattenArrayable<T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T> {
    // 将输入转换为数组，并且展开一层
    return toArray(array).flat(1) as Array<T>
}

/**
 * 获取给定数组的最后一个元素。
 * @param array 一个只读数组，函数将返回该数组的最后一个元素。
 * 返回数组的最后一个元素；如果数组为空，则返回 undefined。
 */
export function last(array: readonly []): undefined
export function last<T>(array: readonly T[]): T
export function last<T>(array: readonly T[]): T | undefined {
    return at(array, -1)
}

/**
 * 将多个可能为数组或可被转换为数组的输入合并为一个数组。
 * @param args - 可以是数组或可被转换为数组的值的参数列表，参数可以为 null 或 undefined。
 * @returns 返回一个合并后的数组，其中包含了所有输入数组中的元素。
 */
export function mergeArrayable<T>(...args: Nullable<Arrayable<T>>[]): Array<T> {
    // 使用 flatMap 将所有输入参数转换为数组并合并为一个数组
    return args.flatMap(i => toArray(i))
}

/**
 * 将数组中的一个元素从一个位置移动到另一个位置。
 * @param arr - 要操作的数组。
 * @param from - 元素当前的索引位置。
 * @param to - 要将元素移动到的新索引位置。
 * @returns 返回移动元素后的数组。
 */
export function move<T>(arr: T[], from: number, to: number) {
    // 从原位置移除元素，并将其插入到新位置
    arr.splice(to, 0, arr.splice(from, 1)[0])
    return arr
}

export type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any

/**
 * 根据提供的过滤函数将数组元素分割成多个子数组。
 * @param array - 一个只读数组，是需要进行分割的原始数组。
 * @param filters - 一个或多个过滤函数，每个过滤函数接收数组元素、当前元素的索引和原数组作为参数，返回一个布尔值以决定元素是否被放入对应的子数组中。
 * @returns 一个二维数组，其中每个子数组都包含通过对应过滤函数的元素；最后一个子数组包含所有未通过任何过滤函数的元素。
 */
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>): [T[], T[]]
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>): [T[], T[], T[]]
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>): [T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>): [T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>, f6: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], ...filters: PartitionFilter<T>[]): any {
    // 初始化结果数组，长度为过滤函数数量加一，每个元素初始化为空数组
    const result: T[][] = Array.from({ length: filters.length + 1 }).fill(null).map(() => [])

    // 遍历原数组中的每个元素，根据提供的过滤函数将其放入相应的子数组中
    array.forEach((e, idx, arr) => {
        let i = 0
        for (const filter of filters) {
            // 如果元素通过当前过滤函数，则将其放入对应的子数组中，并结束当前元素的遍历
            if (filter(e, idx, arr)) {
                result[i].push(e)
                return
            }
            i += 1
        }
        // 如果元素未通过任何过滤函数，则将其放入最后一个子数组中
        result[i].push(e)
    })
    return result
}

/**
 * 从数组中移除指定的值。
 * @param array 目标数组。
 * @param value 需要移除的值。
 * @returns 如果成功移除值，返回true；如果数组不存在或值不在数组中，返回false。
 */
export function remove<T>(array: T[], value: T) {
    // 检查数组是否存在
    if (!array) {
        return false
    }
    // 尝试寻找并移除值
    const index = array.indexOf(value)
    if (index >= 0) {
        array.splice(index, 1) // 当找到值时，从数组中移除
        return true
    }
    return false
}

/**
 * 生成一个包含指定范围数字的数组。
 * @param start 范围的起始值（可选）。如果只提供了一个参数，则该参数被视为结束值，起始值默认为0。
 * @param stop 范围的结束值。如果提供了两个或三个参数，则该参数被视为结束值。
 * @param step 数组中相邻元素之间的差值（可选）。如果提供了三个参数，则该参数为步长，默认值为1。
 * @returns 一个包含指定范围内数字的数组。
 */
export function range(start: number, stop: number, step?: number): number[]
export function range(stop: number): number[]
export function range(...args: any): number[] {
    let start: number, stop: number, step: number

    // 根据传入参数的数量和值，初始化起始值、结束值和步长
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
    // 通过循环，根据步长生成指定范围的数字数组
    while (current < stop) {
        arr.push(current)
        current += step || 1
    }

    return arr
}

/**
 * 从数组中随机采样指定数量的元素。
 * @param arr - 待采样的数组。
 * @param quantity - 采样的数量。
 * @returns 一个包含指定数量随机元素的新数组。
 */
export function sample<T>(arr: T[], quantity: number) {
    // 生成一个指定长度的数组，数组的每个元素都是从原数组中随机选择的元素
    return Array.from({ length: quantity }, _ => arr[Math.round(Math.random() * (arr.length - 1))])
}

/**
 * 随机打乱数组元素的顺序。
 * @param array 要打乱顺序的数组。
 * @returns 打乱顺序后的数组。
 */
export function shuffle<T>(array: T[]): T[] {
    // 遍历数组，从最后一个元素开始到第二个元素，每次随机选取一个位置与当前元素交换
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机生成一个位置j，范围在[0, i]之间
        [array[i], array[j]] = [array[j], array[i]] // 交换元素
    }
    return array
}

/**
 * 将给定的值转换为数组。
 * 如果输入的是一个数组，则直接返回该数组；
 * 如果输入的是一个非数组，则返回一个包含该输入值的新数组。
 * 如果输入值为 null 或 undefined，则返回一个空数组。
 *
 * @param array 可以是数组或者可被转换为数组的值，也可以是 null 或 undefined。
 * @returns 返回一个由输入值构成的数组。
 */
export function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T> {
    array = array ?? []
    return Array.isArray(array) ? array : [array]
}

/**
 * 去除数组中的重复元素。
 * @param array - 输入的只读数组。
 * @returns 返回一个新数组，其中只包含一个出现过的元素。
 */
export function uniq<T>(array: readonly T[]): T[] {
    // 使用Set数据结构去重，然后转换回数组
    return Array.from(new Set(array))
}

/**
 * 根据指定的等值函数，从数组中去除重复元素。
 * @param array - 一个只读数组，是需要去重的源数组。
 * @param equalFn - 一个函数，用于判断两个元素是否相等。如果两个元素相等，该函数应返回true，否则返回false。
 * @returns 返回一个新数组，该数组包含了源数组中不重复的元素。
 */
export function uniqueBy<T>(array: readonly T[], equalFn: (a: any, b: any) => boolean): T[] {
    // 使用数组的reduce方法遍历元素，并构建一个新数组，新数组中不会有重复的元素。
    return array.reduce((acc: T[], cur: any) => {
        // 查找当前元素在已构建的新数组中的索引，如果不存在，则表示该元素是唯一的。
        const index = acc.findIndex((item: any) => equalFn(cur, item))
        if (index === -1) {
            // 当前元素在新数组中不存在时，将其添加到新数组中。
            acc.push(cur)
        }
        return acc // 返回更新后的新数组。
    }, [])
}

/**
 * 移除数组中不符合条件的元素.
 * 此函数会改变原数组.
 * `predicate`（判断函数）从数组的末尾到开头遍历以提升性能.
 *
 * 此函数在处理大型数组时比使用 Array.prototype.filter 更快.
 *
 * @category Array
 */
export function filterInPlace<T>(array: T[], predicate: (item: T, index: number, arr: T[]) => unknown) {
    for (let i = array.length; i--; i >= 0) {
        if (!predicate(array[i], i, array))
            array.splice(i, 1)
    }
    return array
}
