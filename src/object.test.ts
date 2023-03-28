import { describe, expect, it } from 'vitest'
import { deepMerge, objectMap } from './object'

it('objectMap', () => {
  expect(objectMap({}, (...args) => args)).toEqual({})

  expect(
    objectMap(
      { a: 1, b: 2 },
      (k, v) => [k.toString().toUpperCase(), v.toString()],
    ),
  ).toEqual({ A: '1', B: '2' })

  expect(
    objectMap(
      { a: 1, b: 2 },
      () => undefined,
    ),
  ).toEqual({})

  expect(
    objectMap(
      { a: 1, b: 2 },
      (k, v) => k === 'a' ? undefined : [k, v],
    ),
  ).toEqual({ b: 2 })

  expect(
    objectMap(
      { a: 1, b: 2 },
      (k, v) => [v, k],
    ),
  ).toEqual({ 1: 'a', 2: 'b' })
})

describe('deepMerge', () => {
  it('should merge Objects and all nested Ones', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} }
    const obj2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null } as any
    const obj3 = { a: { a1: 'A1', a2: 'A2' }, b: { b1: 'B1' }, c: 'C', d: null }
    expect(deepMerge({}, obj1, obj2)).toEqual(obj3)
  })
  it('should behave like Object.assign on the top level', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C' }
    const obj2 = { a: undefined, b: { b1: 'B1' } }
    const merged = deepMerge(obj1, obj2)
    expect(merged).toEqual(Object.assign({}, obj1, obj2))
  })
  it('should not merge array values, just override', () => {
    const obj1 = { a: ['A', 'B'] }
    const obj2 = { a: ['C'], b: ['D'] }
    expect(deepMerge({}, obj1, obj2)).toEqual({ a: ['C'], b: ['D'] })
  })
})
