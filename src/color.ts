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
    const regex = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
    const match = color.match(regex)
    // 将RGB颜色字符串按逗号分割，提取出r、g、b值
    // const rgb = color.split(',')
    // const r = Number.parseInt(rgb[0].split('(')[1], 10) // 提取并转换红色分量值
    // const g = Number.parseInt(rgb[1], 10) // 提取并转换绿色分量值
    // const b = Number.parseInt(rgb[2].split(')')[0], 10) // 提取并转换蓝色分量值
    if (match) {
        const r = Number.parseInt(match[1], 10)
        const g = Number.parseInt(match[2], 10)
        const b = Number.parseInt(match[3], 10)
        // 计算并格式化十六进制颜色值
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
        return hex
    }
    return ''
}

/**
 * 使用HSL颜色空间进行更自然的调整
 * @param hex HEX颜色值
 * @param lightness 亮度调整（-100到100）
 * @returns 调整后的HEX颜色值
 */
export function adjustHexColorHSL(hex: string, lightness: number): string {
    const cleanHex = hex.replace(/^#/, '')

    // 确保lightness在有效范围内
    const validLightness = Math.max(-100, Math.min(100, lightness))

    // 处理3位HEX格式
    let fullHex = cleanHex
    if (cleanHex.length === 3) {
        fullHex = cleanHex
            .split('')
            .map(char => char + char)
            .join('')
    }

    // 验证是否为有效的6位HEX
    if (!/^[0-9A-F]{6}$/i.test(fullHex)) {
        throw new Error('无效的HEX颜色格式')
    }

    // 将HEX转换为RGB
    const r = Number.parseInt(fullHex.substring(0, 2), 16) / 255
    const g = Number.parseInt(fullHex.substring(2, 4), 16) / 255
    const b = Number.parseInt(fullHex.substring(4, 6), 16) / 255

    // 转换为HSL
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    // 调整亮度
    l = Math.max(0, Math.min(1, l + (validLightness / 100)))

    // 将HSL转换回RGB
    const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0)
            t += 1
        if (t > 1)
            t -= 1
        if (t < 1 / 6)
            return p + (q - p) * 6 * t
        if (t < 1 / 2)
            return q
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6
        return p
    }

    let r2 = l
    let g2 = l
    let b2 = l

    if (s !== 0) {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r2 = hue2rgb(p, q, h + 1 / 3)
        g2 = hue2rgb(p, q, h)
        b2 = hue2rgb(p, q, h - 1 / 3)
    }

    // 将RGB转换回HEX
    const toHex = (color: number): string => {
        const hex = Math.round(color * 255).toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }

    return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`
}
