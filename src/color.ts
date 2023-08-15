/**
 * 将16进制颜色转成Rgba颜色
 * @param hex
 * @param opacity
 * @returns rgba
 * @example
 * ```
 * hexToRgba('#ffffff', 0.5)
 * ```
 */
export function hexToRgba(hex: string, opacity = 1): { red: number; green: number; blue: number; rgb: string; rgba: string } {
    const red = Number.parseInt(`0x${hex.slice(1, 3)}`, 16)
    const green = Number.parseInt(`0x${hex.slice(3, 5)}`, 16)
    const blue = Number.parseInt(`0x${hex.slice(5, 7)}`, 16)
    const RGBA = `rgba(${red},${green},${blue},${opacity})`
    return {
        red,
        green,
        blue,
        rgb: `${red},${green},${blue}`,
        rgba: RGBA,
    }
}

/**
 * 将 rgb 颜色转成 16 进制颜色
 * @param color
 * @returns hex
 * @example
 * ```
 * RGB2Hex('rgb(0, 0, 0)') // '#000000'
 * ```
 */
export function RGB2Hex(color: string): string {
    const rgb = color.split(',')
    const r = Number.parseInt(rgb[0].split('(')[1], 10)
    const g = Number.parseInt(rgb[1], 10)
    const b = Number.parseInt(rgb[2].split(')')[0], 10)

    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
    return hex
}

/**
 * 批量将16进制颜色转成Rgba颜色
 * @param arr 16进制颜色数组
 * @returns Rgba颜色数组
 * @example
 * ```
 * batchHexToRgba(['#ffffff']) // [ '255,255,255' ]
 * ```
 */
export function batchHexToRgba(arr: any[]) {
    if (!arr)
        return []
    arr = arr.map((item) => {
        if (Array.isArray(item)) {
            return batchHexToRgba(item)
        }
        else if (item.indexOf('#') === 0) {
            return hexToRgba(item).rgb
        }
        else if (item.indexOf('rgba(') === 0) {
            const re = /rgba\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
            const match = re.exec(item)
            if (match)
                return `${match[1]},${match[2]},${match[3]}`
        }
        else if (item.indexOf('rgb(') === 0) {
            const re = /rgb\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
            const match = re.exec(item)
            if (match)
                return `${match[1]},${match[2]},${match[3]}`
        }
        return item
    })
    return arr
}
