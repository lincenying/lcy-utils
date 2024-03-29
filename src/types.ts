/**
 * Null or whatever
 */
export type Nullable<T> = T | null | undefined

/**
 * 非 Null 类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T

/**
 * Array, or not yet
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
 * Constructor
 */
export type Constructor<T = void> = new (...args: any[]) => T

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never

/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

/**
 * Infers the arguments type of a function
 */
export type ArgumentsType<T> = T extends ((...args: infer A) => any) ? A : never

export type MergeInsertions<T> =
  T extends object
      ? { [K in keyof T]: MergeInsertions<T[K]> }
      : T

export type DeepMerge<F, S> = MergeInsertions<{
    [K in keyof F | keyof S]: K extends keyof S & keyof F
        ? DeepMerge<F[K], S[K]>
        : K extends keyof S
            ? S[K]
            : K extends keyof F
                ? F[K]
                : never;
}>
