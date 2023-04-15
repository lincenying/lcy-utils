export function assert(condition: boolean, message: string): asserts condition {
  if (!condition)
    throw new Error(message)
}

export function toString(v: any) {
  return Object.prototype.toString.call(v)
}

export function getTypeName(v: any) {
  if (v === null)
    return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

export function noop() {}

/**
 * 获取滚动条宽度
 * @returns scrollWidth
 */
export function getScrollWidth(): number {
  // creates a DOM element
  const testDiv = document.createElement('div')
  // stores the CSS attributes
  const cssAttributes = {
    width: '100px',
    height: '100px',
    overflow: 'scroll',
    position: 'absolute',
    top: '-999px',
  }
  // sets all the styles on testDiv
  for (const attr in cssAttributes)
    (testDiv.style as any)[attr] = (cssAttributes as any)[attr]

  // adds the testDiv to the DOM
  document.body.appendChild(testDiv)
  // measures the the scrollWidth
  const width = testDiv.offsetWidth - testDiv.clientWidth
  // removes the testDiv from the DOM
  document.body.removeChild(testDiv)
  // returns the width
  return width
}

/**
 * 将css插入head中
 * @param newStyle
 * @example
 * ```
 * addNewStyle(`html { color: red; }`)
 * ```
 */
export function addNewStyle(newStyle: string): void {
  let styleElement = <HTMLStyleElement>document.getElementById('styles_js')

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = 'styles_js'
    document.getElementsByTagName('head')[0].appendChild(styleElement)
  }

  styleElement.appendChild(document.createTextNode(newStyle))
}
