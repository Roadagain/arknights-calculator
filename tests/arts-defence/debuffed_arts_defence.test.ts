import { ArtsDefenceDebuff, debuffedArtsDefence } from '../../src/arts-defence'
import { totalDebuffPercentage } from '../../src/debuff'

describe('術耐性デバフの計算', () => {
  const artsDefenceBase = 10
  const createArtsDefenceDebuff = (buff: Partial<ArtsDefenceDebuff>): ArtsDefenceDebuff => {
    return {
      fixedSubtraction: 0,
      percentageSubtraction: 0,
      ...buff,
    }
  }

  describe('デバフなしの場合', () => {
    it('基礎値がそのまま術耐性になる', () => {
      const debuff = createArtsDefenceDebuff({})
      const attack = debuffedArtsDefence(artsDefenceBase, debuff)
      expect(attack).toBe(artsDefenceBase)
    })
  })

  describe('固定値デバフ', () => {
    it('基礎値に減算される', () => {
      const fixedSubtraction = 10
      const expected = artsDefenceBase - fixedSubtraction
      const debuff = createArtsDefenceDebuff({ fixedSubtraction })
      const artsDefence = debuffedArtsDefence(artsDefenceBase, debuff)
      expect(artsDefence).toBe(expected)
    })
  })

  describe('割合デバフ', () => {
    it('基礎値に割合減算される', () => {
      const percentageSubtraction = 0.2
      const expected = artsDefenceBase * (1 - percentageSubtraction)
      const debuff = createArtsDefenceDebuff({ percentageSubtraction })
      const artsDefence = debuffedArtsDefence(artsDefenceBase, debuff)
      expect(artsDefence).toBe(expected)
    })
  })

  describe('固定値デバフと割合デバフの両方がある場合', () => {
    it('固定値が減算された後割合減算される', () => {
      const artsDefenceBase = 85 // ハリガネガニ
      const fixedSubtraction = 20 // 灼獄 特化III
      const percentageSubtraction = totalDebuffPercentage([0.44, 0.3]) // 精神融解 昇進2 潜在強化込み + カランドの威圧 特化III
      const expected = (artsDefenceBase - fixedSubtraction) * (1 - percentageSubtraction) // そこに並びやがれ！

      const debuff: ArtsDefenceDebuff = {
        fixedSubtraction,
        percentageSubtraction,
      }
      const artsDefence = debuffedArtsDefence(artsDefenceBase, debuff)
      expect(artsDefence).toBe(expected)
    })
  })
})
