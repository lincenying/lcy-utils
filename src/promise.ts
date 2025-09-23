import type { Fn } from './types'

import pLimit from 'p-limit'

/**
 * 延迟指定的毫秒数，并在延迟后执行回调函数（可选）
 * @param ms - 指定的延迟时间，以毫秒为单位
 * @param callback - 可选的回调函数，延迟结束后执行
 * @returns Promise<void> - 一个Promise对象，表示延迟操作完成
 */
export function sleep(ms: number, callback?: Fn<any>) {
    // 创建一个Promise，通过setTimeout来延迟指定的时间
    return new Promise<void>(resolve =>
        setTimeout(async () => {
            // 如果提供了回调函数，则异步执行回调函数
            await callback?.()
            // 执行回调函数后，解决Promise
            resolve()
        }, ms),
    )
}

/**
 * 过滤项目的内部标记
 */
const VOID = Symbol('p-void')

interface POptions {
    /**
     * 并发控制
     */
    concurrency?: number | undefined
}

class PInstance<T = any> extends Promise<Awaited<T>[]> {
    private promises = new Set<T | Promise<T>>()

    get promise(): Promise<Awaited<T>[]> {
        let batch
        const items = [...Array.from(this.items), ...Array.from(this.promises)]

        if (this.options?.concurrency) {
            const limit = pLimit(this.options.concurrency)
            batch = Promise.all(items.map(p => limit(() => p)))
        }
        else {
            batch = Promise.all(items)
        }

        return batch.then(l => l.filter((i: any) => i !== VOID))
    }

    constructor(public items: Iterable<T> = [], public options?: POptions) {
        super(() => {})
    }

    add(...args: (T | Promise<T>)[]) {
        args.forEach((item) => {
            this.promises.add(item)
        })
    }

    map<U>(fn: (value: Awaited<T>, index: number) => U): PInstance<Promise<U>> {
        return new PInstance(
            Array.from(this.items)
                .map(async (item, idx) => {
                    const val = await item
                    if ((val as any) === VOID)
                        return VOID as unknown as U
                    return fn(val, idx)
                }),
            this.options,
        )
    }

    filter(fn: (value: Awaited<T>, index: number) => boolean | Promise<boolean>): PInstance<Promise<T>> {
        return new PInstance(
            Array.from(this.items)
                .map(async (item, idx) => {
                    const val = await item
                    const result = await fn(val, idx)
                    if (!result)
                        return VOID as unknown as T
                    return val
                }),
            this.options,
        )
    }

    forEach(fn: (value: Awaited<T>, index: number) => void): Promise<void> {
        return this.map(fn).then()
    }

    reduce<U>(fn: (previousValue: U, currentValue: Awaited<T>, currentIndex: number, array: Awaited<T>[]) => U, initialValue: U): Promise<U> {
        return this.promise.then(array => array.reduce(fn, initialValue))
    }

    clear() {
        this.promises.clear()
    }

    then(fn?: () => PromiseLike<any>) {
        const p = this.promise
        if (fn)
            return p.then(fn)
        else
            return p
    }

    catch(fn?: (err: unknown) => PromiseLike<any>) {
        return this.promise.catch(fn)
    }

    finally(fn?: () => void) {
        return this.promise.finally(fn)
    }
}

/**
 * 用于管理多个Promise的工具
 *
 * @category Promise
 * @example
 * ```
 * import { p } from '@lincy/utils'
 *
 * const items = [1, 2, 3, 4, 5]
 *
 * await p(items)
 *   .map(async i => await multiply(i, 3))
 *   .filter(async i => await isEven(i))
 * // [6, 12]
 * ```
 */
export function p<T = any>(items?: Iterable<T>, options?: POptions): PInstance<T> {
    return new PInstance(items, options)
}
