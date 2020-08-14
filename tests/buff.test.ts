import { totalBuffPercentage } from '../src/buff'

describe('バフ値の計算', () => {
  describe('トータル値の計算', () => {
    it('バフがない場合', () => {
      const totalBuff = totalBuffPercentage([])
      expect(totalBuff).toBe(1)
    })

    it('バフが1つの場合', () => {
      const totalBuff = totalBuffPercentage([2])
      expect(totalBuff).toBe(2)
    })

    it('バフが複数ある場合', () => {
      const totalBuff = totalBuffPercentage([1.5, 2, 1.2])
      expect(totalBuff).toBe(2.7)
    })
  })
})
