import { totalDebuffPercentage } from '../../src/debuff'

describe('割合デバフのトータル倍率の計算', () => {
  describe('割合デバフがない場合', () => {
    it('0%減衰になる', () => {
      const totalDebuff = totalDebuffPercentage([])
      expect(totalDebuff).toBe(0)
    })
  })

  describe('割合デバフが1つの場合', () => {
    it('デバフ倍率がトータル倍率になる', () => {
      const totalDebuff = totalDebuffPercentage([0.1])
      expect(totalDebuff).toBeCloseTo(0.1)
    })
  })

  describe('割合デバフが複数ある場合', () => {
    it('各デバフ倍率の乗算結果がトータル倍率になる', () => {
      const totalDebuff = totalDebuffPercentage([0.2, 0.3, 0.1])
      expect(totalDebuff).toBeCloseTo(0.496)
    })
  })
})
