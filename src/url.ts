import type { Obj, ObjT } from './types'

/**
 * 序列化查询参数
 * @param obj 需要转换的对象
 * @returns 字符串
 * @example
 * ```ts
 * objectToQueryString({ id: 123, name: 'test1' }) // id=123&name=test1
 * ```
 */
export function objectToQueryString(obj: Obj): string {
    const queryString = Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
    return queryString
}

/**
 * 反转序列化查询参数
 * @param queryString 需要转换的字符串
 * @returns 对象
 * @example
 * ```ts
 * queryStringToObject("?id=123&name=test1") // {id: '123', name: 'test1'}
 * ```
 */
export function queryStringToObject(queryString: string): ObjT<string> {
    const params = new URLSearchParams(queryString)
    const obj: ObjT<string> = {}

    for (const [key, value] of params.entries())
        obj[key] = value

    return obj
}

/**
 * 解析 URL 参数
 * @param url url地址
 * @returns 解析后的URL
 */
export function parseUrl(url: string): URL {
    return new URL(url)
}
