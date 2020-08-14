import { totalBuffPercentage } from '../../src/buff'

describe('割合バフのトータル値の計算', () => {
  describe('割合バフがない場合は1倍', () => {
    it('1倍になる', () => {
      const totalBuff = totalBuffPercentage([])
      expect(totalBuff).toBe(1)
    })
  })

  describe('割合バフが1つの場合', () => {
    it('バフの値がトータル値になる', () => {
      const totalBuff = totalBuffPercentage([2])
      expect(totalBuff).toBe(2)
    })
  })

  describe('割合バフが複数ある場合', () => {
    it('各バフの加算結果がトータル値になる', () => {
      const totalBuff = totalBuffPercentage([1.5, 2, 1.2])
      expect(totalBuff).toBe(2.7)
    })
  })
})
