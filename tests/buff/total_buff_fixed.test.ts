import { totalBuffFixed } from '../../src/buff'

describe('固定値バフのトータル値計算', () => {
  describe('バフがない場合', () => {
    it('トータル値が0になる', () => {
      const total = totalBuffFixed([])
      expect(total).toBe(0)
    })
  })

  describe('バフが1つの場合', () => {
    it('バフ値がトータル値になる', () => {
      const total = totalBuffFixed([100])
      expect(total).toBe(100)
    })
  })

  describe('バフが複数の場合', () => {
    it('各バフ値の総和がトータル値になる', () => {
      const total = totalBuffFixed([140, 200, 180])
      expect(total).toBe(520)
    })
  })
})
