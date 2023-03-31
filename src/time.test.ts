import { expect, it } from 'vitest'
import { UTC2Date } from './time'

it('Time', () => {
//   expect(getDateDiff('1680009213681')).toMatchInlineSnapshot('"5分钟前"')
//   expect(getDateDiff('1680009213')).toMatchInlineSnapshot('"5分钟前"')
//   expect(getDateDiff('2023-03-28 21:18:00')).toMatchInlineSnapshot('"59秒前"')
//   expect(getDateDiff('2023-03-28')).toMatchInlineSnapshot('"13小时前"')
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
