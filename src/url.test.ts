import { expect, it } from 'vitest'
import { objectToQueryString, parseUrl, queryStringToObject } from './url'

it('Url', () => {
    expect(objectToQueryString({ id: 123, name: 'test1' })).toMatchInlineSnapshot('"id=123&name=test1"')
    expect(queryStringToObject("id=123&name=test1")).toMatchInlineSnapshot(`
      {
        "id": "123",
        "name": "test1",
      }
    `)
    expect(queryStringToObject("?id=123&name=test1")).toMatchInlineSnapshot(`
      {
        "id": "123",
        "name": "test1",
      }
    `)
    expect(parseUrl('http://localhost:8080/demo/#/home?id=123').host).toMatchInlineSnapshot('"localhost:8080"')
    expect(parseUrl('http://localhost:8080/demo/#/home?id=123').search).toMatchInlineSnapshot('""')
    expect(parseUrl('https://www.example.com/path/to/page?query=123').search).toMatchInlineSnapshot('"?query=123"')
})
