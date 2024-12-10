# @lincy/utils

Usage

```bash
pnpm install @lincy/utils
```

## array

### at

```ts
function at(array: readonly [], index: number): undefined
function at<T>(array: readonly T[], index: number): T
function at<T>(array: readonly T[] | [], index: number): T | undefined
```
从数组中获取指定索引的元素。
- @param array - 一个只读数组或空数组。
- @param index - 要获取元素的索引，可以是正数或负数。负数索引从数组末尾开始计算。
- @returns 如果指定索引的元素存在，则返回该元素；如果索引超出范围或数组为空，则返回 `undefined`。

### arrayToObject
```ts
function arrayToObject(arr: any[], key?: string, val?: string): Objable<string | number>
```
将数组转换为对象。该函数遍历输入数组中的每个元素，并使用指定的键（key）和值（val）构建一个对象。
- @param arr 输入的数组，数组中的每个元素都应包含至少一个与`key`和`val`参数对应的属性。
- @param key 用于作为新对象键的数组元素属性。默认值为'value'。
- @param val 用于作为新对象值的数组元素属性。默认值为'name'。
- @returns 返回一个对象，其中键由数组元素的`key`属性值决定，对应的值由数组元素的`val`属性值决定。
- @example
```ts
arrayToObject([{ name: 'AAA', value: 1 }, { name: 'BBB', value: 2 }], 'name', 'value')
```

### clamp

```ts
function clamp(n: number, min: number, max: number): number
```
将给定的数值限制在指定的最小值和最大值之间。
- @param n — 要限制的数值。
- @param min — 允许的最小值。
- @param max — 允许的最大值。
- @returns — 返回经过限制后的数值，确保它不会小于最小值，也不会大于最大值。

### clampArrayRange
```ts
function clampArrayRange(n: number, arr: readonly unknown[]): number
```
将指定的数字限制在数组的范围内。
- @param n — 要限制的数字。
- @param arr — 用于限制范围的数组，该数组是只读的。
- @returns — 返回限制后的数字，该数字将位于数组的起始位置和结束位置之间（包括起始位置，不包括结束位置）。

### flattenArrayable
```ts
function flattenArrayable<T>(array?: Nullable<Arrayable<T | Array<T>>>): Array<T>
```
将可能嵌套的数组或数组元素转换为一维数组。
- @param array — 可能为 null 的数组或数组的数组，或者数组的数组的元素。
- @returns — 返回一个转换后的一维数组。

### last
```ts
function last(array: readonly []): undefined
function last<T>(array: readonly T[]): T
function last<T>(array: readonly T[]): T | undefined
```
获取给定数组的最后一个元素。
- @param array — 一个只读数组，函数将返回该数组的最后一个元素。
@returns — 返回数组的最后一个元素；如果数组为空，则返回 undefined。

### mergeArrayable
```ts
function mergeArrayable<T>(...args: Nullable<Arrayable<T>>[]): Array<T>
```
将多个可能为数组或可被转换为数组的输入合并为一个数组。
- @param args — 可以是数组或可被转换为数组的值的参数列表，参数可以为 null 或 undefined。
- @returns — 返回一个合并后的数组，其中包含了所有输入数组中的元素。

### move
```ts
function move<T>(arr: T[], from: number, to: number): T[]
```
将数组中的一个元素从一个位置移动到另一个位置。
- @param arr — 要操作的数组。
- @param from — 元素当前的索引位置。
- @param to — 要将元素移动到的新索引位置。
- @returns — 返回移动元素后的数组。

### partition
```ts
function partition<T>(array: readonly T[], filters: PartitionFilter<T>): [T[], T[]]
function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>): [T[], T[], T[]]
function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>): [T[], T[], T[], T[]]
function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>): [T[], T[], T[], T[], T[]]
function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[]]
function partition<T>(array: readonly T[], filters: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>, f4: PartitionFilter<T>, f5: PartitionFilter<T>, f6: PartitionFilter<T>): [T[], T[], T[], T[], T[], T[], T[]]
```
根据提供的过滤函数将数组元素分割成多个子数组。
- @param array — 一个只读数组，是需要进行分割的原始数组。
- @param filters — 一个或多个过滤函数，每个过滤函数接收数组元素、当前元素的索引和原数组作为参数，返回一个布尔值以决定元素是否被放入对应的子数组中。
- @returns — 一个二维数组，其中每个子数组都包含通过对应过滤函数的元素；最后一个子数组包含所有未通过任何过滤函数的元素。

### remove
```ts
function remove<T>(array: T[], value: T): boolean
```
从数组中移除指定的值。
- @param array — 目标数组。
- @param value — 需要移除的值。
- @returns — 如果成功移除值，返回true；如果数组不存在或值不在数组中，返回false。

### range
```ts
export function range(start: number, stop: number, step?: number): number[]
export function range(stop: number): number[]
export function range(...args: any): number[]
```
生成一个包含指定范围数字的数组。
- @param start — 范围的起始值（可选）。如果只提供了一个参数，则该参数被视为结束值，起始值默认为0。
- @param stop — 范围的结束值。如果提供了两个或三个参数，则该参数被视为结束值。
- @param step — 数组中相邻元素之间的差值（可选）。如果提供了三个参数，则该参数为步长，默认值为1。
- @returns — 一个包含指定范围内数字的数组。

### sample
```ts
function sample<T>(arr: T[], quantity: number): T[]
```
从数组中随机采样指定数量的元素。
- @param arr — 待采样的数组。
- @param quantity — 采样的数量。
- @returns — 一个包含指定数量随机元素的新数组。

### shuffle
```ts
function shuffle<T>(array: T[]): T[]
```
随机打乱数组元素的顺序。
- @param array — 要打乱顺序的数组。
- @returns — 打乱顺序后的数组。

### toArray
```ts
function toArray<T>(array?: Nullable<Arrayable<T>>): Array<T>
```
将给定的值转换为数组。 如果输入的是一个数组，则直接返回该数组；\
如果输入的是一个非数组，则返回一个包含该输入值的新数组。\
如果输入值为 null 或 undefined，则返回一个空数组。
- @param array — 可以是数组或者可被转换为数组的值，也可以是 null 或 undefined。
- @returns — 返回一个由输入值构成的数组。

### uniq
```ts
function uniq<T>(array: readonly T[]): T[]
```
去数组中的重复元素。
- @param array — 输入的只读数组。
- @returns — 返回一个新数组，其中只包含一个出现过的元素。

### uniqueBy
```ts
function uniqueBy<T>(array: readonly T[], equalFn: (a: any, b: any) => boolean): T[]
```
根据指定的等值函数，从数组中去除重复元素。
- @param array — 一个只读数组，是需要去重的源数组。
- @param equalFn — 一个函数，用于判断两个元素是否相等。如果两个元素相等，该函数应返回true，否则返回false。
- @returns — 返回一个新数组，该数组包含了源数组中不重复的元素。

## base

### addNewStyle
```ts
function addNewStyle(newStyle: string): void
```
向文档中添加新的样式。
- @param newStyle — 要添加的新样式，以字符串形式提供。
@returns — void
- @example
```ts
addNewStyle(`html { color: red; }`)
```

### assert
```ts
function assert(condition: boolean, message: string): asserts condition
```
断言函数，用于在条件不满足时抛出错误。
- @param condition — 条件，一个布尔值，表示断言是否成功。
- @param message — 错误信息，当条件不满足时抛出的错误包含此信息。
- @returns — 无返回值，但会在条件不满足时抛出错误。
- @asserts — 断言条件为真。

### getScrollWidth
```ts
function getScrollWidth(): number
```
获取滚动宽度 该函数创建一个DOM元素，设置其样式为具有滚动条的100px*100px的方块，然后将其添加到DOM中，\
通过测量该元素的offsetWidth与clientWidth之差来获取滚动条的宽度，最后移除该元素并返回滚动条宽度。
- @returns — 滚动条宽度

### getTypeName
```ts
function getTypeName(v: any): string
```
获取给定值的类型名称。
- @param v — 任意类型的值。
- @returns — 返回值的类型名称。如果值是对象或函数，则返回通过Object.prototype.toString方法得到的类型名称字符串；否则，返回JavaScript的基本类型名称。

### noop
```ts
function noop(): void
```
一个没有任何操作的函数，即空操作函数。 该函数不接受任何参数，也不返回任何值。

### toString
```ts
function toString(v: any): string
```
将任意值转换为字符串形式。
- @param v — 任意类型的值。
- @returns — 返回通过调用Object.prototype.toString方法得到的字符串。

## color

### batchHexToRgba
```ts
function batchHexToRgba(arr: any[]): any[]
```
批量将十六进制颜色值转换为rgba格式
- @param arr — 包含颜色值的数组，可以是嵌套数组。颜色值可以是十六进制字符串或rgba/rgb字符串。
- @returns — 返回一个由rgba格式颜色值组成的数组，如果输入无效则返回空数组。
- @example
```ts
batchHexToRgba(['#ffffff']) // [ '255,255,255' ]
```

### hexToRgba
```ts
function hexToRgba(hex: string, opacity?: number): {
    red: number
    green: number
    blue: number
    rgb: string
    rgba: string
}
```

将十六进制颜色值转换为rgba格式
- @param hex — 表示十六进制颜色的字符串，例如"#ffffff"
- @param opacity — 可选参数，表示颜色的透明度，取值范围为0到1，默认值为1（不透明）
- @returns — 返回一个对象，包含红色、绿色、蓝色分量的数值，以及rgb和rgba格式的颜色字符串
- @example
```ts
hexToRgba('#ffffff', 0.5)
```

### RGB2Hex
```ts
function RGB2Hex(color: string): string
```
将RGB颜色值转换为十六进制颜色值
- @param color — RGB颜色值，格式为"rgb(x, y, z)"，其中x、y、z为0到255之间的整数
- @returns — 十六进制颜色值，格式为"#xxxxxx"，其中xxxxxx为六位的十六进制数
- @example
```ts
RGB2Hex('rgb(0, 0, 0)') // '#000000'
```

## equal

### isDeepEqual
```ts
function isDeepEqual(value1: any, value2: any): boolean
```
深度比较两个值是否相等。
- @param value1 — 第一个要比较的值，可以是任意类型。
- @param value2 — 第二个要比较的值，可以是任意类型。
- @returns — 如果两个值深度相等则返回 true，否则返回 false。

## function

### batchInvoke
```ts
function batchInvoke(functions: Nullable<Fn>[]): void
```
批量调用函数数组中的每个函数。
- @param functions — 可空的函数数组，数组中的每个元素都应为函数类型。

### invoke
```ts
function invoke(fn: Fn): void
```
调用一个给定的函数并返回其结果。
- @param fn — 一个函数，该函数将被调用并返回其执行结果。
- @returns — 调用给定函数后的返回值。

### tap
```ts
function tap<T>(value: T, callback: (value: T) => void): T
```
该函数接受一个值和一个回调函数作为参数，然后执行回调函数，将值作为参数传递给回调函数，最后返回原始值。
- @param value — 任意类型的值，将作为参数传递给回调函数。
- @param callback — 一个以 value 为参数的回调函数，该函数将在调用 tap 函数时执行。
- @returns — 返回与传入的 value 参数相同的值。
- @example
```ts
function createUser(name: string): User {
    return tap(new User(), (user) => {
        user.name = name
    })
}
```

## guards

### isTruthy
```ts
function isTruthy<T>(v: T): v is NonNullable<T>
```
检查给定的值是否为真值（truthy）。\
该函数通过通用类型参数 T 接收一个值 v。\
返回一个布尔值，表示该值是否为非空（NonNullable）真值。
- @param v — 任意类型的值，该值将被检查是否为真。
- @returns — 返回一个布尔值，如果 v 是非空的真值，则为 true；否则为 false。

### notNullish
```ts
function notNullish<T>(v: T | null | undefined): v is NonNullable<T>
```
检查给定的值是否不为null或undefined。\
该函数是一个类型守卫，用于在运行时确定值是否非空，\
并在类型系统中将类型缩小到非可空类型。
- @param v — 待检查的值，可以是任何类型T，包括null或undefined。
- @returns — 返回一个布尔值，如果值不为null或undefined，则为true；否则为false。

### noNull
```ts
function noNull<T>(v: T | null): v is Exclude<T, null>
```
检查给定的值是否不为null，用于类型守卫
- @param v — 任意类型，可能是null
- @returns — 返回一个布尔值，如果值不为null，则为true；如果值为null，则为false。

### notUndefined
```ts
function notUndefined<T>(v: T): v is Exclude<T, undefined>
```
检查一个值是否不是 undefined。\
该函数用于类型守卫，如果传入的值不是 undefined，则断言该值的类型为 T 中排除 undefined 的类型。
- @param v — 任意类型的值，需要被检查是否为 undefined。
- @returns — 返回一个布尔值，表示该值是否不是 undefined。如果是，则类型断言为 T 中排除 undefined 的类型。

## is

### isDef
```ts
const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
```
检查一个值是否定义（不是undefined）。
- @param val 任意类型的值，可以是未定义的。
- @returns 返回一个布尔值，如果值已定义则为true，否则为false。

### isBoolean
```ts
const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
```
检查一个值是否为布尔值。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是布尔型则为true，否则为false。

### isFunction
```ts
const isFunction = <T extends () => void> (val: any): val is T => typeof val === 'function'
```
检查一个值是否为函数。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是函数则为true，否则为false。

### isInt
```ts
const isInt = Number.isInteger
```
检查一个值是否为整数。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是整数则为true，否则为false。

### isArray
```ts
const isArray = Array.isArray
```
检查一个值是否为数组。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是数组则为true，否则为false。

### isNumber
```ts
const isNumber = (val: any): val is number => typeof val === 'number'
```
检查一个值是否为数字。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是数字则为true，否则为false。

### isString
```ts
const isString = (val: unknown): val is string => typeof val === 'string'
```
检查一个值是否为字符串。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是字符串则为true，否则为false。

### isObject
```ts
const isObject = (val: any): val is object => toString(val) === '[object Object]'
```
检查一个值是否为对象（排除null）。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是对象则为true，否则为false。

### isUndefined
```ts
const isUndefined = (val: any): val is undefined => toString(val) === '[object Undefined]'
```
检查一个值是否为undefined。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值为undefined则为true，否则为false。

### isNull
```ts
const isNull = (val: any): val is null => toString(val) === '[object Null]'
```
检查一个值是否为null。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值为null则为true，否则为false。

### isRegExp
```ts
const isRegExp = (val: any): val is RegExp => toString(val) === '[object RegExp]'
```
检查一个值是否为正则表达式。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是正则表达式则为true，否则为false。

### isDate
```ts
const isDate = (val: any): val is Date => toString(val) === '[object Date]'
```
检查一个值是否为日期对象。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是日期对象则为true，否则为false。

### isMap
```ts
const isMap = (val: any): val is Map<any, any> => toString(val) === '[object Map]'
```
检查一个值是否为Map对象。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是Map对象则为true，否则为false。

### isSet
```ts
const isSet = (val: any): val is Set<any> => toString(val) === '[object Set]'
```
检查一个值是否为Set对象。
- @param val 任意值。
- @returns 返回一个布尔值，如果该值是Set对象则为true，否则为false。

### isPromise
```ts
function isPromise<T = any>(obj: any): obj is Promise<T>
```
检查一个对象是否为Promise。
- @param obj 要检查的对象。
- @returns 返回一个布尔值，表示该对象是否为Promise。

### isEmail
```ts
function isEmail(email: string): boolean
```
检查给定的字符串是否为有效的电子邮件地址
- @param email 待检查的电子邮件地址
- @returns 如果邮箱地址有效，返回true，否则返回false

### isPhoneNumber
```ts
function isPhoneNumber(phoneNumber: string): boolean
```
检查给定的字符串是否为中国大陆的有效手机号码
- @param phoneNumber 待检查的手机号码
- @returns 如果手机号码有效，返回true，否则返回false

### isWindow
```ts
const isWindow = (val: any): boolean => typeof window !== 'undefined' && toString(val) === '[object Window]'
 ```
检查一个值是否为浏览器的window对象。
- @param val 任意类型的值，将被检查是否为window对象。
- @returns 返回一个布尔值，如果该值是window对象，则为true，否则为false。

### isBrowser
```ts
const isBrowser = typeof window !== 'undefined'
```
判断当前环境是否为浏览器环境。
- @returns 返回一个布尔值，如果是浏览器环境，则为true，否则为false。

### isEmpty
```ts
function isEmpty(payload: any): boolean
```
判断给定的传入值是否为空。
- @param payload 任意类型的数据。
- @returns 返回一个布尔值，如果传入值为空则为true，否则为false。

### isFalse
```ts
function isFalse(payload: any): boolean
```
检查给定的传入值是否为假值。
- @param payload 任意类型的值，作为检查的目标。
- @returns 返回一个布尔值，如果传入值为假值或非布尔、非数字且为空的值，则返回 true；否则返回 false。

## math

### sum
```ts
function sum(...args: number[] | number[][]): number
```
计算传入参数的总和。\
该函数接受一个或多个数字参数，包括一维数组或二维数组，然后将所有数字相加得出总和。
- @param args — 可以是数字的序列（一维数组或二维数组）。
- @returns — 返回所有输入数字的总和。
- @example
```ts
sum(1, 2, 3, 4)
sum([1, 2, 3, 4])
```

## object

### isKeyOf
```ts
function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T
```
检查一个键是否为给定对象的键。
- @param obj — 一个泛型对象T。
- @param k — 需要检查的键。
- @returns — 返回一个布尔值，表示k是否为obj的键。

### clearUndefined
```ts
function clearUndefined<T extends object>(obj: T): T
```
清除对象中值为undefined的属性。
- @param obj — 要处理的对象。
- @returns — 处理后的对象，不包含值为undefined的属性。
- @example
```ts
clearUndefined({ a: undefined, b: 2, c: 3, d: 4 }) // {b: 2, c: 3, d: 4}
```

### deepClone
```ts
function deepClone<T extends Record<string, any>>(obj: T): T
```
深度克隆对象。
- @param obj — 要进行深度克隆的对象，该对象必须是包含属性的记录类型。
- @returns — 返回一个与传入对象属性相同的新对象，新对象不会与原对象共享引用。

### deepEqual
```ts
function deepEqual<T>(a: T, b: T): boolean
```
检查两个值是否深度相等。
- @param a — 第一个要比较的值。
- @param b — 第二个要比较的值。
- @returns — 如果两个值深度相等则返回true，否则返回false。

### deepMerge
```ts
function deepMerge<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S>
```
深度合并对象。
- @param target — 目标对象，合并的起点。
- @param sources — 源对象，一个或多个将被合并到目标对象的对象。
- @returns — 返回合并后的对象。

### deepMergeWithArray
```ts
function deepMergeWithArray<T extends object = object, S extends object = T>(target: T, ...sources: S[]): DeepMerge<T, S>
```
深度合并对象，可以合并数组和普通对象。\
如果目标对象和源对象都是可合并的（即普通对象），则会递归合并它们的属性。\
数组会通过追加方式合并。
- @param target — 目标对象，合并的起点。
- @param sources — 源对象数组，将这些对象的属性合并到目标对象中。
- @returns — 返回合并后的对象。如果没有任何源对象提供，则返回目标对象。

### hasOwnProperty
```ts
function hasOwnProperty<T>(obj: T, v: PropertyKey): boolean
```
检查对象是否拥有指定的属性。
- @param obj — 要检查的对象。
- @param v — 要检查的属性键，可以是字符串或符号。
- @returns — 如果对象拥有指定的属性，则返回true；否则返回false。
@see — https://eslint.org/docs/rules/no-prototype-builtins

### isMergableObject
```ts
function isMergableObject(item: any): item is object
```
检查一个项是否为可以合并的对象。
- @param item — 任意类型的项，需要被检查是否为可合并的对象。
- @returns — 返回一个布尔值，如果该项是对象而不是数组，则为true；否则为false。

### objectEntries
```ts
function objectEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]>
```
将对象转换为包含键值对的数组。
- @param obj — 需要转换的对象。
- @returns — 返回一个数组，其中每个元素都是一个包含对象键和对应值的二元组。

### objectKeys
```ts
function objectKeys<T extends object>(obj: T): Array<`${keyof T & (string | number | boolean | null | undefined)}`>
```
获取对象中所有可枚举属性的键名数组。
- @param obj — 一个泛型对象，泛型T必须扩展自object类型。
- @returns 返回一个数组，数组中的元素类型为keyof T & (string | number | boolean | null | undefined)， 即对象键名的字符串形式，保证键名类型安全。

### objectMap
```ts
function objectMap<K extends string, V, NK = K, NV = V>(obj: Record<K, V>, fn: (key: K, value: V) => [NK, NV] | undefined): Record<K, V>
```
对象映射函数，将给定对象的键值对通过提供的函数处理后，生成新的对象。
- @param obj — 输入的对象，其键值对将被遍历。
- @param fn - 处理函数，接收当前键和值作为参数，返回新的键值对数组。如果返回undefined，则当前键值对不会被包含在输出对象中。 Transform:
- @example
```ts
objectMap({ a: 1, b: 2 }, (k, v) => [k.toString().toUpperCase(), v.toString()])
// { A: '1', B: '2' }
```
Swap key/value:
- @example
```ts
objectMap({ a: 1, b: 2 }, (k, v) => [v, k])
// { 1: 'a', 2: 'b' }
```
Filter keys:
- @example
```ts
objectMap({ a: 1, b: 2 }, (k, v) => k === 'a' ? undefined : [k, v])
// { b: 2 }
```
- @returns — 返回一个新的对象，其键值对是通过处理函数fn处理后的结果。

### objectPick
```ts
function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined?: boolean): Pick<O, T>
```
从对象中选择指定的属性。
- @param obj — 要选择属性的对象。
- @param keys — 要选择的属性的键名数组。
- @param omitUndefined — 是否忽略值为undefined的属性，默认为false。
- @returns — 返回一个新对象，包含指定的对象中选择出来的属性。
- @example
```ts
objectPick({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'b']) // {a: 1, b: 2}
```

## promise

### sleep
```ts
function sleep(ms: number, callback?: Fn<any>): Promise<void>
```
延迟指定的毫秒数，并在延迟后执行回调函数（可选）
- @param ms - 指定的延迟时间，以毫秒为单位
- @param callback - 可选的回调函数，延迟结束后执行
- @returns Promise - 一个Promise对象，表示延迟操作完成

## string

### addStr
```ts
function addStr(str: string, num: number, add?: string): string
```
将字符串按照指定长度分隔，并在分隔处添加指定字符。
- @param str — 需要处理的原始字符串。
- @param num — 指定每个分隔段的长度。
- @param add — 分隔时添加的字符，默认为换行符 '\n'。
- @returns — 处理后的字符串。
- @example
```ts
addStr('121432432432432', 3, '|') // '121|432|432|432|432'
```

### capitalize
```ts
function capitalize(str: string): string
```
将给定字符串的第一个字符转换为大写，其余字符转换为小写。
- @param str — 待转换的字符串。
- @returns — 转换后的字符串。
- @example
```ts
capitalize('hello') // 'Hello'
```

### ensurePrefix
```ts
function ensurePrefix(prefix: string, str: string): string
```
确保字符串的前缀
- @category — String
- @example
```ts
ensurePrefix('abc', 'abcdef') // 'abcdef'
ensurePrefix('hi ', 'jack') // 'hi jack'
```

### ensureSuffix
```ts
function ensureSuffix(suffix: string, str: string): string
```
确保字符串的后缀
- @category — String
- @example
```ts
ensureSuffix('world', 'hello ') // 'hello world'
ensureSuffix('123', 'abc123') // 'abc123'
```

### parseCookies
```ts
function parseCookies(cookies: string): {
    [key: string]: string
}
```
解析cookie字符串为一个对象
- @param cookies — 要解析的cookie字符串
- @returns — 返回一个对象，每个键值对代表一个cookie
- @example
```ts
parseCookies('key1=all; key2=false; key3=true;')
// { key3: 'true', key1: 'all', key2: 'false' }
```

### Random
```ts
function Random(lower: number, upper: number): number
```
生成一个在指定范围内的随机数。
- @param lower — 下限，如果未指定，则默认为0。
- @param upper — 上限，如果未指定，则默认为0。
- @returns — 在给定下限和上限范围内的随机数。

### randomStr
```ts
function randomStr(size?: number, dict?: string): string
```
生成一个随机字符串。
- @param size — 随机字符串的长度，默认为16。
- @param dict — 用于生成随机字符串的字符集，默认为urlAlphabet。
- @returns — 生成的随机字符串。

### slash
```ts
function slash(str: string): string
```
将反斜杠替换为斜杠
- @category — String
- @example
```ts
slash('\\123')// '/123'
slash('\\\\')// '//'
slash('\\\h\\\i')// '/h/i'
```

### strLen
```ts
function strLen(str: string): number
```
计算字符串的长度，考虑到中文等双字节字符，该函数能够准确计算字符串中字符的数量。
- @param str — 需要计算长度的字符串。
- @returns — 返回字符串的长度，其中单字节字符计为1，双字节字符计为2。
- @example
```ts
strLen('hello') // 5
strLen('中国') // 4
```

### template
```ts
function template(str: string, object: Record<string | number, any>, fallback?: string | ((key: string) => string)): string
function template(str: string, ...args: (string | number | bigint | undefined | null)[]): string
function template(str: string, ...args: any[]): string
```
简单的模板引擎，就像 Python 的 .format() 一样 支持以基于索引或基于对象/名称的方法传递变量\
使用基于对象/名称的方法时，您可以传递后备值作为第三个参数
- @category — String
- @example
```ts
const result = template(
    'Hello {0}! My name is {1}.',
    'Inès',
    'Anthony'
) // Hello Inès! My name is Anthony.
const result = namedTemplate(
    '{greet}! My name is {name}.',
    { greet: 'Hello', name: 'Anthony' }
) // Hello! My name is Anthony.
const result = namedTemplate(
    '{greet}! My name is {name}.',
    { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
    'placeholder'
) // Hello! My name is placeholder.
```

### transformStr
```ts
function transformStr(str: string): string
```
将给定字符串按照连字符('-')分割，并将分割后的每个部分的首字母大写，然后将这些部分重新连接成一个字符串。
- @param str — 需要转换的字符串。
- @returns — 转换后的字符串，其中每个由连字符分隔的部分的首字母都将大写。
- @example
```ts
transformStr('a-bc-df') // aBcDf
```

## time

### getDate
```ts
function getDate(str?: string | number): Date
```
根据给定的字符串或数值获取一个Date对象。\
\
如果提供字符串，尝试解析该字符串为日期，支持多种格式，例如'2021-01-01'或'20210101'等。\
如果提供数值，将其视为毫秒数创建Date对象。\
如果未提供参数，返回当前日期和时间的Date对象。
- @param str — 可选参数，为字符串或数值类型的日期表示。
- @returns — 返回一个Date对象，要么根据提供的参数解析得到，要么返回当前日期和时间的Date对象。

### getDateDiff
```ts
function getDateDiff(time: string): string
```
计算并返回与指定时间的差异。
- @param time — 指定的时间，格式为字符串。
- @returns - 返回与指定时间的差异描述字符串。根据时间差，返回的字符串格式可以是天数、小时数、分钟数、秒数， 或者如果时间差非常小，则返回"刚刚"。如果无法计算差异，则返回空字符串。

### subtractTimestamps
```ts
function subtractTimestamps(timestamp1: string, timestamp2: string): [number, number, number, number, string, string, string]
```
函数用于计算两个时间戳之间的差值，并返回以天、小时、分钟、秒的形式表示的时间差。
- @param timestamp1 — 第一个时间戳，格式为字符串。
- @param timestamp2 — 第二个时间戳，格式为字符串。
- @returns — 返回一个数组，包含天、小时、分钟、秒以及格式化后的小时、分钟和秒字符串。

### timestamp
```ts
function timestamp(): number
```
获取当前时间戳 该函数没有参数。
- @returns — 返回当前的毫秒级时间戳

### UTC2Date
```ts
function UTC2Date(utc?: string | number, format?: string, add?: number): string
```
将UTC时间转换为指定格式的日期字符串。
- @param utc — 可以是UTC时间的字符串或数值。
- @param format — 指定输出的日期格式，默认为'yyyy-mm-dd'， 格式 yyyy-mm-dd hh:ii:ss.SSS | yyyy-m-d h:i:s.S。
- @param add — 可选参数，用于指定要添加到日期上的天数。
- @returns — 返回转换后的日期字符串。

## url

### objectToQueryString
```ts
function objectToQueryString(obj: Objable): string
```
将对象转换为查询字符串
- @param obj — 可以被转换为查询字符串的对象。对象的键值对会被编码并以&符号连接。
- @returns — 返回转换后的查询字符串
- @example
```ts
objectToQueryString({ id: 123, name: 'test1' }) // id=123&name=test1
```

### parseUrl
```ts
function parseUrl(url: string): URL
```
解析给定的URL字符串为URL对象。
- @param url — 待解析的URL字符串。
- @returns — 返回一个URL对象，该对象表示解析后的URL。

### queryStringToObject
```ts
function queryStringToObject(queryString: string): Objable<string>
```
将查询字符串转换为对象
- @param queryString — 一个表示查询参数的字符串，例如："name=John&age=30"
- @returns — 返回一个对象，其中键值对代表了查询字符串中的参数及其值
- @example
```ts
queryStringToObject('?id=123&name=test1') // {id: '123', name: 'test1'}
```

License

MIT
