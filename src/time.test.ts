import { expect, it } from 'vitest'
import { UTC2Date } from './time'

it('Time', () => {
//   expect(getDateDiff('1680009213681')).toMatchInlineSnapshot('"5分钟前"')
//   expect(getDateDiff('1680009213')).toMatchInlineSnapshot('"5分钟前"')
//   expect(getDateDiff('2023-03-28 21:18:00')).toMatchInlineSnapshot('"59秒前"')
//   expect(getDateDiff('2023-03-28')).toMatchInlineSnapshot('"13小时前"')
  expect(UTC2Date('2023/03/28', 'y-m-d')).toMatchInlineSnapshot('"2023-03-28"')
  expect(UTC2Date('2023-03-28', 'y-m-d')).toMatchInlineSnapshot('"2023-03-28"')
  expect(UTC2Date('1680009213', 'y-m-d')).toMatchInlineSnapshot('"2023-03-28"')
})
