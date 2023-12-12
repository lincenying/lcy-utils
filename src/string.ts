import { isObject } from './is'

/**
 * 将反斜杠替换为斜杠
 *
 * @category String
 */
export function slash(str: string) {
    return str.replace(/\\/g, '/')
}

/**
 * 确保字符串的前缀
 *
 * @category String
 */
export function ensurePrefix(prefix: string, str: string) {
    if (!str.startsWith(prefix))
        return prefix + str
    return str
}

/**
 * 确保字符串的后缀
 *
 * @category String
 */
export function ensureSuffix(suffix: string, str: string) {
    if (!str.endsWith(suffix))
        return str + suffix
    return str
}

/**
 * 简单的模板引擎，就像 Python 的 .format() 一样
 * 支持以基于索引或基于对象/名称的方法传递变量
 * 使用基于对象/名称的方法时，您可以传递后备值作为第三个参数
 *
 * @category String
 * @example
 * ```
 * const result = template(
 *   'Hello {0}! My name is {1}.',
 *   'Inès',
 *   'Anthony'
 * ) // Hello Inès! My name is Anthony.
 * ```
 *
 * ```
 * const result = namedTemplate(
 *   '{greet}! My name is {name}.',
 *   { greet: 'Hello', name: 'Anthony' }
 * ) // Hello! My name is Anthony.
 * ```
 *
 * ```
 * const result = namedTemplate(
 *   '{greet}! My name is {name}.',
 *   { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
 *   'placeholder'
 * ) // Hello! My name is placeholder.
 * ```
 */
export function template(str: string, object: Record<string | number, any>, fallback?: string | ((key: string) => string)): string
export function template(str: string, ...args: (string | number | bigint | undefined | null)[]): string
export function template(str: string, ...args: any[]): string {
    const [firstArg, fallback] = args

    if (isObject(firstArg)) {
        const vars = firstArg as Record<string, any>
        return str.replace(/{([\w\d]+)}/g, (_, key) => vars[key] || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key))
    }
    else {
        return str.replace(/{(\d+)}/g, (_, key) => {
            const index = Number(key)
            if (Number.isNaN(index))
                return key
            return args[index]
        })
    }
}

// port from nanoid
// https://github.com/ai/nanoid
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
/**
 * 生成随机字符串
 * @category String
 */
export function randomStr(size = 16, dict = urlAlphabet) {
    let id = ''
    let i = size
    const len = dict.length
    while (i--)
        id += dict[(Math.random() * len) | 0]
    return id
}

/**
 * 首字母大写，其他小写
 * @category string
 * @example
 * ```
 * capitalize('hello') => 'Hello'
 * ```
 */
export function capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

// 将字符串中的横线模式替换成驼峰模式
// a-bc-df => aBcDf
/**
 * 将字符串中的横线模式替换成驼峰模式
 * @param str string
 * @returns string
 * @example
 * ```
 * transformStr('a-bc-df') // aBcDf
 * ```
 */
export function transformStr(str: string): string {
    const strArr = str.split('-')
    for (let i = 1; i < strArr.length; i++)
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)

    return strArr.join('')
}

/**
 * 计算字符串长度, 汉字算2
 * @category string
 * @example
 * ```
 * strLen('hello') // 5
 * ```
 */
export function strLen(str: string): number {
    let len = 0
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        // 单字节加1
        if ((c >= 0x0001 && c <= 0x007E) || (c >= 0xFF60 && c <= 0xFF9F))
            len++
        else
            len += 2
    }
    return len
}

/**
 * 返回一个lower - upper之间的随机数
 * @param lower 最小值
 * @param upper 最大值
 * @returns number
 */
export function Random(lower: number, upper: number): number {
    lower = +lower || 0
    upper = +upper || 0
    return Math.random() * (upper - lower) + lower
}

/**
 * 在固定位置添加字符串
 * @param str 需要处理的字符串
 * @param num 每num个字符
 * @param add 需要添加的字符
 * @returns string
 * @example
 * ```
 * addStr('121432432432432', 3, '|') // '121|432|432|432|432'
 * ```
 */
export function addStr(str: string, num: number, add = '\n'): string {
    const arr = str ? str.split('') : [] // 要先判断字符串是否有字符 然后将它分割成数组
    let newStr = ''
    arr.forEach((item: string, index: number) => {
        newStr += item
        if ((index + 1) % num === 0 && index !== arr.length - 1)
            newStr += add
    })
    return newStr
}
