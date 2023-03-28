import type { Fn } from './types'

/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
