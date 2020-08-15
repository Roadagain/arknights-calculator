import { DefenceDebuff, debuffedDefence } from '../../src/defence'

describe('防御力デバフの計算', () => {
  const defenceBase = 400
  const createDefenceDebuff = (debuff: Partial<DefenceDebuff>): DefenceDebuff => {
    return {
      fixedSubtraction: 0,
      percentageSubtraction: 0,
      ...debuff,
    }
  }

  describe('デバフなしの場合', () => {
    it('基礎値がそのまま防御力になる', () => {
      const debuff = createDefenceDebuff({})
      const attack = debuffedDefence(defenceBase, debuff)
      expect(attack).toBe(defenceBase)
    })
  })

  describe('固定値デバフ', () => {
    it('基礎値に減算される', () => {
      const fixedSubtraction = 200
      const debuff = createDefenceDebuff({ fixedSubtraction })
      const defence = debuffedDefence(defenceBase, debuff)
      const expected = defenceBase - fixedSubtraction
      expect(defence).toBe(expected)
    })
  })

  describe('割合デバフ', () => {
    it('基礎値に割合減算される', () => {
      const percentageSubtraction = 0.3
      const debuff = createDefenceDebuff({ percentageSubtraction })
      const defence = debuffedDefence(defenceBase, debuff)
      const expected = defenceBase * (1 - percentageSubtraction)
      expect(defence).toBe(expected)
    })
  })

  describe('固定値デバフと割合デバフの両方がある場合', () => {
    it('固定値が減算された後割合減算される', () => {
      const defenceBase = 2000 // 凶悪クラッシャー
      const fixedSubtraction = 300 // 爆炎 特化III
      const percentageSubtraction = 0.6 // カランドの威圧 特化III
      const expected = (defenceBase - fixedSubtraction) * (1 - percentageSubtraction) // 聖なる鈴の音に、その鎧は朽ち果てる

      const debuff: DefenceDebuff = {
        fixedSubtraction,
        percentageSubtraction,
      }
      const defence = debuffedDefence(defenceBase, debuff)
      expect(defence).toBe(expected)
    })
  })
})
