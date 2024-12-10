/**
 * 批量将十六进制颜色值转换为rgba格式
 * @param arr 包含颜色值的数组，可以是嵌套数组。颜色值可以是十六进制字符串或rgba/rgb字符串。
 * @returns 返回一个由rgba格式颜色值组成的数组，如果输入无效则返回空数组。
 * @example
 * ```
 * batchHexToRgba(['#ffffff']) // [ '255,255,255' ]
 * ```
 */
export function batchHexToRgba(arr: any[]) {
    if (!arr) {
        return [] // 输入为空，直接返回空数组
    }
    arr = arr.map((item) => {
        // 递归处理嵌套数组
        if (Array.isArray(item)) {
            return batchHexToRgba(item)
        }
        else if (item.indexOf('#') === 0) {
            // 处理十六进制颜色值
            return hexToRgba(item).rgb
        }
        else if (item.indexOf('rgba(') === 0) {
            // 处理rgba颜色值
            const re = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*\d+\s*\)/i
            const match = re.exec(item)
            if (match) {
                return `${match[1]},${match[2]},${match[3]}`
            }
        }
        else if (item.indexOf('rgb(') === 0) {
            // 处理rgb颜色值
            const re = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
            const match = re.exec(item)
            if (match) {
                return `${match[1]},${match[2]},${match[3]}`
            }
        }
        return item // 如果无法转换，保留原值
    })
    return arr
}

/**
 * 将十六进制颜色值转换为rgba格式
 * @param hex 表示十六进制颜色的字符串，例如"#ffffff"
 * @param opacity 可选参数，表示颜色的透明度，取值范围为0到1，默认值为1（不透明）
 * @returns 返回一个对象，包含红色、绿色、蓝色分量的数值，以及rgb和rgba格式的颜色字符串
 * @example
 * ```
 * hexToRgba('#ffffff', 0.5)
 * ```
 */
export function hexToRgba(hex: string, opacity = 1): { red: number, green: number, blue: number, rgb: string, rgba: string } {
    // 从hex字符串中提取红色、绿色和蓝色分量，并将它们从十六进制转换为十进制
    const red = Number.parseInt(`0x${hex.slice(1, 3)}`, 16)
    const green = Number.parseInt(`0x${hex.slice(3, 5)}`, 16)
    const blue = Number.parseInt(`0x${hex.slice(5, 7)}`, 16)

    // 构造rgba颜色字符串
    const RGBA = `rgba(${red},${green},${blue},${opacity})`

    return {
        red,
        green,
        blue,
        rgb: `${red},${green},${blue}`, // rgb格式颜色字符串
        rgba: RGBA, // rgba格式颜色字符串
    }
}

/**
 * 将RGB颜色值转换为十六进制颜色值
 * @param color RGB颜色值，格式为"rgb(x, y, z)"，其中x、y、z为0到255之间的整数
 * @returns 十六进制颜色值，格式为"#xxxxxx"，其中xxxxxx为六位的十六进制数
 * @example
 * ```
 * RGB2Hex('rgb(0, 0, 0)') // '#000000'
 * ```
 */
export function RGB2Hex(color: string): string {
    // 将RGB颜色字符串按逗号分割，提取出r、g、b值
    const rgb = color.split(',')
    const r = Number.parseInt(rgb[0].split('(')[1], 10) // 提取并转换红色分量值
    const g = Number.parseInt(rgb[1], 10) // 提取并转换绿色分量值
    const b = Number.parseInt(rgb[2].split(')')[0], 10) // 提取并转换蓝色分量值

    // 计算并格式化十六进制颜色值
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    return hex
}
