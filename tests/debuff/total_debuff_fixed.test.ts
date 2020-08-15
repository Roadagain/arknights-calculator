import { totalDebuffFixed } from '../../src/debuff'

describe('固定値デバフのトータル値計算', () => {
  describe('デバフがない場合', () => {
    it('トータル値が0になる', () => {
      const total = totalDebuffFixed([])
      expect(total).toBe(0)
    })
  })

  describe('デバフが1つの場合', () => {
    it('デバフ値がトータル値になる', () => {
      const total = totalDebuffFixed([100])
      expect(total).toBe(100)
    })
  })

  describe('デバフが複数の場合', () => {
    it('各デバフ値の総和がトータル値になる', () => {
      const total = totalDebuffFixed([170, 200, 50])
      expect(total).toBe(420)
    })
  })
})
