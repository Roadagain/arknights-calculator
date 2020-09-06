import { totalBuffPercentage } from '../../src/buff'

describe('割合バフのトータル倍率の計算', () => {
  describe('割合バフがない場合', () => {
    it('1倍になる', () => {
      const totalBuff = totalBuffPercentage([])
      expect(totalBuff).toBe(100)
    })
  })

  describe('割合バフが1つの場合', () => {
    it('バフ倍率がトータル倍率になる', () => {
      const totalBuff = totalBuffPercentage([200])
      expect(totalBuff).toBe(200)
    })
  })

  describe('割合バフが複数ある場合', () => {
    it('各バフ倍率の総和がトータル倍率になる', () => {
      const totalBuff = totalBuffPercentage([150, 200, 120])
      expect(totalBuff).toBe(270)
    })
  })

  describe('基準値を考慮した計算', () => {
    describe('ゼロベースフラグが立っていない場合', () => {
      it('100が基準値になる', () => {
        const totalBuff = totalBuffPercentage([120, 130])
        expect(totalBuff).toBe(150)
      })
    })

    describe('ゼロベースフラグが立っている場合', () => {
      it('0が基準値になる', () => {
        const totalBuff = totalBuffPercentage([30, 50], true)
        expect(totalBuff).toBe(80)
      })
    })
  })
})
