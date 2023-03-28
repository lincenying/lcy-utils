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
 */
export function template(str: string, ...args: any[]): string {
  return str.replace(/{(\d+)}/g, (match, key) => {
    const index = Number(key)
    if (Number.isNaN(index))
      return match
    return args[index]
  })
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
export const transformStr = (str: string): string => {
  const strArr = str.split('-')
  for (let i = 1; i < strArr.length; i++)
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)

  return strArr.join('')
}

// 计算字符串长度, 汉字算2
export const strLen = (str: string): number => {
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

// 返回一个lower - upper之间的随机数
export const Random = (lower: number, upper: number): number => {
  lower = +lower || 0
  upper = +upper || 0
  return Math.random() * (upper - lower) + lower
}

// 在固定位置添加字符串
export const addStr = (str: string, num: number): string => {
  const arr = str ? str.split('') : [] // 要先判断字符串是否有字符 然后将它分割成数组
  let newStr = ''
  arr.forEach((item: string, index: number) => {
    newStr += item
    if ((index + 1) % num === 0 && index !== arr.length - 1) {
      // 6可以更改，最后一位不加
      newStr += '\n' // 加上插入的字符
    }
  })
  return newStr
}
