import { expect, it } from 'vitest'
import { UTC2Date, subtractTimestamps } from './time'

it('Time', () => {
  // expect(getDate('1680009213681')).toMatchInlineSnapshot('2023-03-28T13:13:33.681Z')
  // expect(getDate('1680009213')).toMatchInlineSnapshot('2023-03-28T13:13:33.000Z')
  // expect(getDate('2023/03/28')).toMatchInlineSnapshot('2023-03-27T16:00:00.000Z')
  // expect(getDate('2023-03-28')).toMatchInlineSnapshot('2023-03-27T16:00:00.000Z')
  // expect(getDate('2023-03-28 13:13:33')).toMatchInlineSnapshot('2023-03-28T05:13:33.000Z')
  // expect(getDate('2023-03-28 13:13:33.681')).toMatchInlineSnapshot('2023-03-28T05:13:33.681Z')
  // expect(getDate('')).toMatchInlineSnapshot('2023-03-31T08:18:56.563Z')
  // expect(getDate()).toMatchInlineSnapshot('2023-03-31T08:18:56.568Z')

  // expect(getDateDiff('1680009213681')).toMatchInlineSnapshot('"2天前"')
  // expect(getDateDiff('1680009213')).toMatchInlineSnapshot('"2天前"')
  // expect(getDateDiff('2023-03-28 21:18:00')).toMatchInlineSnapshot('"2天前"')
  // expect(getDateDiff('2023-03-27 21:18:00')).toMatchInlineSnapshot('"03-27 21:18"')
  // expect(getDateDiff('2023-01-28')).toMatchInlineSnapshot('"01-28 00:00"')
  // expect(getDateDiff('2022-01-28')).toMatchInlineSnapshot('"2022-01-28 00:00"')
  expect(subtractTimestamps('2022-01-28', '2022-01-29')).toMatchInlineSnapshot(`
    [
      1,
      0,
      0,
      0,
    ]
  `)
  expect(subtractTimestamps('2022-01-28 12:12:12', '2022-01-29 13:13:13')).toMatchInlineSnapshot(`
    [
      1,
      1,
      1,
      1,
    ]
  `)

  expect(UTC2Date('2023/03/28', 'yyyy-mm-dd')).toEqual('2023-03-28')
  expect(UTC2Date('2023-03-28', 'yyyy-mm-dd')).toEqual('2023-03-28')
  expect(UTC2Date('1680009213', 'yyyy-mm-dd')).toEqual('2023-03-28')

  expect(UTC2Date('2023/03/28', 'yyyy-m-d')).toEqual('2023-3-28')
  expect(UTC2Date('2023-03-28', 'yyyy-m-d')).toEqual('2023-3-28')
  expect(UTC2Date('1680009213', 'yyyy-m-d')).toEqual('2023-3-28')

  expect(UTC2Date('2023/03/28', 'yyyy-m-d')).toEqual('2023-3-28')
  expect(UTC2Date('2023-03-28', 'yyyy-m-d')).toEqual('2023-3-28')
  expect(UTC2Date('1680009213', 'yyyy-mm-dd hh:ii:ss')).toEqual('2023-03-28 21:13:33')

  expect(UTC2Date('1680009213681', 'yyyy-mm-dd hh:ii:ss.SSS')).toEqual('2023-03-28 21:13:33.681')
})
