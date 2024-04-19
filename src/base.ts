/**
 * 断言函数，用于在条件不满足时抛出错误。
 * @param condition 条件，一个布尔值，表示断言是否成功。
 * @param message 错误信息，当条件不满足时抛出的错误包含此信息。
 * @return 无返回值，但会在条件不满足时抛出错误。
 * @asserts 断言条件为真。
 */
export function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message) // 当条件不满足时，抛出包含错误信息的异常
    }
}

/**
 * 将任意值转换为字符串形式。
 * @param v 任意类型的值。
 * @returns 返回通过调用Object.prototype.toString方法得到的字符串。
 */
export function toString(v: any) {
    return Object.prototype.toString.call(v)
}

/**
 * 获取给定值的类型名称。
 * @param v 任意类型的值。
 * @returns 返回值的类型名称。如果值是对象或函数，则返回通过`Object.prototype.toString`方法得到的类型名称字符串；否则，返回JavaScript的基本类型名称。
 */
export function getTypeName(v: any) {
    // 处理null值特殊情况
    if (v === null) {
        return 'null'
    }
    // 使用`Object.prototype.toString`方法获取类型名称，并进行处理
    const type = toString(v).slice(8, -1).toLowerCase()
    // 如果值是对象或函数，返回处理后的类型名称；否则，返回值的基本类型
    return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

/**
 * 一个没有任何操作的函数，即空操作函数。
 * 该函数不接受任何参数，也不返回任何值。
 */
export function noop() {}

/**
 * 获取滚动宽度
 * 该函数创建一个DOM元素，设置其样式为具有滚动条的100px*100px的方块，然后将其添加到DOM中，
 * 通过测量该元素的offsetWidth与clientWidth之差来获取滚动条的宽度，最后移除该元素并返回滚动条宽度。
 *
 * @returns {number} 滚动条宽度
 */
export function getScrollWidth(): number {
    // 创建一个DOM元素
    const testDiv = document.createElement('div')
    // 定义并存储CSS属性
    const cssAttributes = {
        width: '100px',
        height: '100px',
        overflow: 'scroll',
        position: 'absolute',
        top: '-999px',
    }
    // 设置testDiv的样式
    for (const attr in cssAttributes) {
        (testDiv.style as any)[attr] = (cssAttributes as any)[attr]
    }

    // 将testDiv添加到DOM中
    document.body.appendChild(testDiv)
    // 测量滚动宽度
    const width = testDiv.offsetWidth - testDiv.clientWidth
    // 从DOM中移除testDiv
    document.body.removeChild(testDiv)
    // 返回滚动宽度
    return width
}

/**
 * 向文档中添加新的样式。
 * @param newStyle 要添加的新样式，以字符串形式提供。
 * @return void
 * @example
 * ```
 * addNewStyle(`html { color: red; }`)
 * ```
 */
export function addNewStyle(newStyle: string): void {
    // 尝试获取已存在的样式元素
    let styleElement = <HTMLStyleElement>document.getElementById('styles_js')

    // 如果不存在该样式元素，则创建一个新的样式元素
    if (!styleElement) {
        styleElement = document.createElement('style')
        styleElement.id = 'styles_js'
        // 将新创建的样式元素添加到文档头部
        document.getElementsByTagName('head')[0].appendChild(styleElement)
    }

    // 向样式元素中添加新的样式内容
    styleElement.appendChild(document.createTextNode(newStyle))
}
