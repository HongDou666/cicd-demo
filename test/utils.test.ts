import { it, expect, describe } from 'vitest'
import { testArr } from '../src/utils/index'

// 测试用例
describe('utils test', () => {
  it('100% pass', () => {
    expect(1).toBe(1)
  })
  it('testArr', () => {
    expect(testArr(1, 2)).toStrictEqual([1, 2])
  })
})
