interface hexToRgbaType {
  red: number
  green: number
  blue: number
  rgb: string
  rgba: string
}

export const hexToRgba = (hex: string, opacity = 1): hexToRgbaType => {
  const red = parseInt(`0x${hex.slice(1, 3)}`, 16)
  const green = parseInt(`0x${hex.slice(3, 5)}`, 16)
  const blue = parseInt(`0x${hex.slice(5, 7)}`, 16)
  const RGBA = `rgba(${red},${green},${blue},${opacity})`
  return {
    red,
    green,
    blue,
    rgb: `${red},${green},${blue}`,
    rgba: RGBA,
  }
}

export const RGB2Hex = (color: string): string => {
  const rgb = color.split(',')
  const r = parseInt(rgb[0].split('(')[1], 10)
  const g = parseInt(rgb[1], 10)
  const b = parseInt(rgb[2].split(')')[0], 10)

  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  return hex
}

export const batchHexToRgba = (arr: any[]) => {
  if (!arr)
    return []
  arr = arr.map((item) => {
    if (Array.isArray(item))
      return batchHexToRgba(item)
    if (item.indexOf('#') === 0)
      return hexToRgba(item).rgb

    if (item.indexOf('rgba(') === 0) {
      const re = /rgba\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
      const match = re.exec(item)
      if (match)
        return `${match[1]},${match[2]},${match[3]}`
    }
    if (item.indexOf('rgb(') === 0) {
      const re = /rgb\(\s*([\d]+)\s*,\s*([\d]+)\s*,\s*([\d]+)\s*\)/i
      const match = re.exec(item)
      if (match)
        return `${match[1]},${match[2]},${match[3]}`
    }
    return item
  })
  return arr
}
