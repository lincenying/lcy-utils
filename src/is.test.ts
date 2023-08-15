import { expect, it } from 'vitest'
import { isEmpty, isFalse } from './is'

it('is', () => {
    expect(isEmpty('')).toEqual(true)
    expect(isEmpty(null)).toEqual(true)
    expect(isEmpty(undefined)).toEqual(true)
    expect(isEmpty([])).toEqual(true)
    expect(isEmpty({})).toEqual(true)

    expect(isEmpty(false)).toEqual(false)
    expect(isEmpty(0)).toEqual(false)

    expect(isFalse('')).toEqual(true)
    expect(isFalse(null)).toEqual(true)
    expect(isFalse(undefined)).toEqual(true)
    expect(isFalse([])).toEqual(true)
    expect(isFalse({})).toEqual(true)
    expect(isFalse(false)).toEqual(true)
    expect(isFalse(0)).toEqual(true)

    expect(isFalse('0')).toEqual(false)
})
