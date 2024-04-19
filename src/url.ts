import type { Objable } from './types'

/**
 * 将对象转换为查询字符串
 * @param obj 可以被转换为查询字符串的对象。对象的键值对会被编码并以&符号连接。
 * @returns 返回转换后的查询字符串
 * @example
 * ```ts
 * objectToQueryString({ id: 123, name: 'test1' }) // id=123&name=test1
 * ```
 */
export function objectToQueryString(obj: Objable): string {
    // 将对象的每个键值对编码后拼接为键=值的形式，并通过&符号连接所有键值对
    const queryString = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
    return queryString
}

/**
 * 将查询字符串转换为对象
 * @param queryString 一个表示查询参数的字符串，例如："name=John&age=30"
 * @returns 返回一个对象，其中键值对代表了查询字符串中的参数及其值
 * @example
 * ```ts
 * queryStringToObject("?id=123&name=test1") // {id: '123', name: 'test1'}
 * ```
 */
export function queryStringToObject(queryString: string): Objable<string> {
    // 使用 URLSearchParams 类来解析查询字符串
    const params = new URLSearchParams(queryString)
    // 初始化一个空对象来存储解析后的参数
    const obj: Objable<string> = {}

    // 遍历所有参数，并将其添加到 obj 对象中
    for (const [key, value] of params.entries()) {
        obj[key] = value
    }

    return obj
}

/**
 * 解析给定的URL字符串为URL对象。
 * @param url 待解析的URL字符串。
 * @returns 返回一个URL对象，该对象表示解析后的URL。
 */
export function parseUrl(url: string): URL {
    return new URL(url)
}
