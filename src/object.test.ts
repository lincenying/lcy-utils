import { describe, expect, it } from 'vitest'
import { deepClone, deepMerge, objectMap, objectToCookies } from './object'

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
    it('should overide plain value', () => {
        const obj1 = { a: { x: 1 } }
        const obj2 = { a: { x: { f: 2 } } } as any
        expect(deepMerge({}, obj1, obj2)).toEqual({ a: { x: { f: 2 } } })
    })
})

describe('deepClone', () => {
    it('deep clone object', () => {
        const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} }
        const obj2 = deepClone(obj1)
        obj1.c = 'CC'
        const isEqual = obj1 === obj2
        expect(isEqual).toEqual(false)
    })
})

interface CookieOptions {
    path?: string
    domain?: string
    expires?: Date | number
    maxAge?: number
    secure?: boolean
    httpOnly?: boolean
    sameSite?: 'Strict' | 'Lax' | 'None'
}

describe('objectToCookies', () => {
    it('objectToCookies', () => {
        const cookiesData = {
            userId: '12345',
            sessionToken: 'abcde-12345',
            theme: 'dark',
        }

        const cookieOptions: CookieOptions = {
            path: '/',
            maxAge: 3600, // 1小时有效期
            secure: true,
            sameSite: 'Lax',
        }
        expect(objectToCookies(cookiesData, cookieOptions)).toEqual(
            [
                'userId=12345; path=/; max-age=3600; secure; SameSite=Lax',
                'sessionToken=abcde-12345; path=/; max-age=3600; secure; SameSite=Lax',
                'theme=dark; path=/; max-age=3600; secure; SameSite=Lax',
            ],
        )
    })
})
