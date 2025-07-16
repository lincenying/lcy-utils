import { isObject } from './is'

/**
 * 将字符串按照指定长度分隔，并在分隔处添加指定字符。
 * @param str 需要处理的原始字符串。
 * @param num 指定每个分隔段的长度。
 * @param add 分隔时添加的字符，默认为换行符 '\n'。
 * @returns 处理后的字符串。
 * @example
 * ```
 * addStr('121432432432432', 3, '|') // '121|432|432|432|432'
 * ```
 */
export function addStr(str: string, num: number, add = '\n'): string {
    // 判断字符串是否为空，若不为空则按字符分割成数组
    const arr = str ? str.split('') : []
    let newStr = ''
    // 遍历数组，每num个字符添加一次分隔符
    arr.forEach((item: string, index: number) => {
        newStr += item
        // 检查是否达到指定的分隔长度，并且不是最后一个字符
        if ((index + 1) % num === 0 && index !== arr.length - 1) {
            newStr += add
        }
    })
    return newStr
}

/**
 * 将给定字符串的第一个字符转换为大写，其余字符转换为小写。
 * @param str 待转换的字符串。
 * @returns 转换后的字符串。
 * @example
 * ```
 * capitalize('hello') => 'Hello'
 * ```
 */
export function capitalize(str: string): string {
    // 将字符串的第一个字符转为大写，其余部分转为小写并拼接
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 确保字符串的前缀
 *
 * @category String
 * @example
 * ```
 * ensurePrefix('abc', 'abcdef') // 'abcdef'
 * ensurePrefix('hi ', 'jack') // 'hi jack'
 * ```
 */
export function ensurePrefix(prefix: string, str: string) {
    if (!str.startsWith(prefix)) {
        return prefix + str
    }
    return str
}

/**
 * 确保字符串的后缀
 *
 * @category String
 * @example
 * ```
 * ensureSuffix('world', 'hello ') // 'hello world'
 * ensureSuffix('123', 'abc123') // 'abc123'
 * ```
 */
export function ensureSuffix(suffix: string, str: string) {
    if (!str.endsWith(suffix)) {
        return str + suffix
    }
    return str
}

/**
 * 解析cookie字符串为一个对象
 * @param cookies 要解析的cookie字符串
 * @returns 返回一个对象，每个键值对代表一个cookie
 * @example
 * ```
 * parseCookies('key1=all; key2=false; key3=true;')
 * // { key3: 'true', key1: 'all', key2: 'false' }
 * ```
 */
export function parseCookies(cookies: string): { [key: string]: string } {
    // 将cookie字符串按分号分割为数组
    const cookieArr = cookies.split(';')
    const cookieObj: { [key: string]: string } = {}
    // 遍历cookie数组，解析每个cookie
    cookieArr.forEach((cookie) => {
        // 将cookie按等号分割为键和值
        const [key, value] = cookie.split('=')
        if (key && value) {
            // 去除键和值两边的空格，并对值进行URL解码
            const cookieKey = key.trim()
            const cookieValue = decodeURIComponent(value.trim())
            // 将解析出的键值对添加到cookie对象中
            cookieObj[cookieKey] = cookieValue
        }
    })

    return cookieObj
}

/**
 * 将对象转换为 Cookie 字符串
 * @param data 要转换的键值对对象
 * @returns 格式化后的 Cookie 字符串
 */
export function objToCookies(
    data: Record<string, string | number | boolean>,
): string {
    // 处理键值对
    const entries = Object.entries(data)
        .map(([key, value]) => {
            const encodedKey = encodeURIComponent(key)
            const encodedValue = encodeURIComponent(value.toString())
            return `${encodedKey}=${encodedValue}`
        })
        .join('; ')

    // 组合结果
    return entries
}

/**
 * 生成一个在指定范围内的随机数。
 * @param lower 下限，如果未指定，则默认为0。
 * @param upper 上限，如果未指定，则默认为0。
 * @returns 在给定下限和上限范围内的随机数。
 */
export function Random(lower: number, upper: number): number {
    // 将输入的下限和上限转换为数字类型，并设置默认值为0
    lower = +lower || 0
    upper = +upper || 0
    // 返回一个介于下限和上限之间的随机数
    return Math.random() * (upper - lower) + lower
}

// port from nanoid
// https://github.com/ai/nanoid
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
/**
 * 生成一个随机字符串。
 * @param {number} size 随机字符串的长度，默认为16。
 * @param {string} dict 用于生成随机字符串的字符集，默认为urlAlphabet。
 * @returns {string} 生成的随机字符串。
 */
export function randomStr(size: number = 16, dict: string = urlAlphabet): string {
    let id = '' // 初始化生成的字符串
    let i = size // 初始化剩余字符数量
    const len = dict.length // 字符集的长度

    // 循环生成随机字符串
    while (i--) {
        id += dict[(Math.random() * len) | 0] // 从字符集中随机选择一个字符并添加到生成的字符串中
    }

    return id // 返回生成的随机字符串
}

/**
 * 将反斜杠替换为斜杠
 *
 * @category String
 * @example
 * ```
 * slash('\\123') => '/123'
 * slash('\\\\') => '//'
 * slash('\\\h\\\i') => '/h/i'
 * ```
 */
export function slash(str: string) {
    return str.replace(/\\/g, '/')
}

/**
 * 计算字符串的长度，考虑到中文等双字节字符，该函数能够准确计算字符串中字符的数量。
 * @param str 需要计算长度的字符串。
 * @returns 返回字符串的长度，其中单字节字符计为1，双字节字符计为2。
 * @example
 * ```
 * strLen('hello') // 5
 * strLen('中国') // 4
 * ```
 */
export function strLen(str: string): number {
    let len = 0
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i)
        // 判断字符是否为单字节，若是则长度加1
        if ((c >= 0x0001 && c <= 0x007E) || (c >= 0xFF60 && c <= 0xFF9F)) {
            len++
        }
        else {
            len += 2
        } // 若是双字节字符，长度加2
    }
    return len
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
        return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] || ((typeof fallback === 'function' ? fallback(key) : fallback) ?? key))
    }
    else {
        return str.replace(/\{(\d+)\}/g, (_, key) => {
            const index = Number(key)
            if (Number.isNaN(index)) {
                return key
            }
            return args[index]
        })
    }
}

/**
 * 将给定字符串按照连字符('-')分割，并将分割后的每个部分的首字母大写，然后将这些部分重新连接成一个字符串。
 * @param str 需要转换的字符串。
 * @returns 转换后的字符串，其中每个由连字符分隔的部分的首字母都将大写。
 * @example
 * ```
 * transformStr('a-bc-df') // aBcDf
 * ```
 */
export function transformStr(str: string): string {
    // 通过连字符('-')分割输入字符串 into an array of substrings
    const strArr = str.split('-')

    // 遍历数组，将每个部分的首字母转换为大写
    for (let i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
    }

    // 将处理后的数组重新连接为一个字符串并返回
    return strArr.join('')
}
