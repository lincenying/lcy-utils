/**
 * 定义一个泛型类型 Nullable<T>，该类型表示 T 类型的值或者是 null 或者是 undefined。
 * 这个类型的定义使得我们可以更灵活地处理可能为 null 或 undefined 的值。
 * @param T - 代表任意类型的参数。
 * @returns 返回一个联合类型，包括 T 类型、null 和 undefined。
 */
export type Nullable<T> = T | null | undefined

/**
 * 非 Null 类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T

/**
 * 定义一个泛型类型 Arrayable<T>，它可以是类型 T 的一个实例，也可以是一个 T 类型的数组。
 * @typeParam T - Arrayable 中元素的类型。
 */
export type Arrayable<T> = T | Array<T>

/**
 * 键为字符串, 值为 Any 的对象
 */
export type Objable<T = any> = Record<string, T>

/**
 * Function
 */
export type Fn<T = void> = () => T
/**
 * Any Function
 */
export type AnyFn = (...args: any[]) => any

/**
 * Promise Function
 */
export type PromiseFn<T> = (...args: any[]) => Promise<T>
/**
 * Promise, or maybe not
 */
export type Awaitable<T> = T | PromiseLike<T>

/**
 * 定义一个构造函数类型。
 *
 * @typeParam T 泛型参数，表示构造函数实例化的对象类型，默认为void。
 * @returns 返回一个构造函数，该构造函数可以接受任意参数列表，并返回类型为T的实例。
 */
export type Constructor<T = void> = new (...args: any[]) => T

/**
 * 获取数组类型的元素类型
 * 该类型断言适用于泛型T，如果T是数组类型，则返回数组中元素的类型；如果不是数组类型，则返回never。
 * @typeParam T - 传入的泛型类型，可以是任意类型。
 * @returns 返回元素类型，如果T不是数组类型，则返回never。
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * 将联合类型转换为交集类型
 * @param U 联合类型
 * @returns 交集类型
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

/**
 * 类型别名ArgumentsType用于推断一个函数的参数类型。
 *
 * @template T - 期望为一个函数类型，该函数可以接受任意数量的参数并返回任意类型。
 * @returns 返回一个元组类型，代表传入函数的参数类型。如果T不是函数类型，则返回never。
 */
export type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

/**
 * 将嵌套的对象或数组中的所有插入类型合并。
 * 对于对象，递归地将每个属性的类型应用此合并插入操作。
 * 对于非对象类型，直接返回其类型。
 * @typeParam T - 要进行合并插入操作的类型。
 * @returns 返回经过合并插入操作后的类型。
 */
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T

/**
 * 深度合并两个类型 F 和 S 的定义。
 * - F: 第一个类型参数，代表源对象的类型。
 * - S: 第二个类型参数，代表目标对象的类型。
 * 返回值为合并后的类型，该类型确保了源对象和目标对象的属性都被合并，
 * 如果两个对象有相同的属性键，则会递归合并属性值的类型。
 */
export type DeepMerge<F, S> = MergeInsertions<{
    [K in keyof F | keyof S]: K extends keyof S & keyof F
        ? DeepMerge<F[K], S[K]> // 当键存在于F和S中时，递归合并属性值的类型
        : K extends keyof S
            ? S[K] // 如果键只存在于S中，使用S中的类型
            : K extends keyof F
                ? F[K] // 如果键只存在于F中，使用F中的类型
                : never; // 如果键既不存在于F也不存在于S，类型为never
}>
