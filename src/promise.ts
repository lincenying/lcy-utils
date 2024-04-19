import type { Fn } from './types'

/**
 * 函数名: sleep
 * 功能: 延迟指定的毫秒数，并在延迟后执行回调函数（可选）
 * 参数:
 *    - ms: number，指定的延迟时间，以毫秒为单位
 *    - callback?: Fn<any>，可选的回调函数，延迟结束后执行
 * 返回值: Promise<void>，一个Promise对象，表示延迟操作完成
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
