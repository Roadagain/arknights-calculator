import { DefenceBuff, buffedDefence } from '../../src/defence'

describe('防御力バフの計算', () => {
  const deefnceBase = 400
  const createDefenceBuff = (buff: Partial<DefenceBuff>): DefenceBuff => {
    return {
      fixedAddition: 0,
      percentageAddition: 1,
      ...buff,
    }
  }

  describe('バフなしの場合', () => {
    it('基礎値がそのまま防御力になる', () => {
      const buff = createDefenceBuff({})
      const attack = buffedDefence(deefnceBase, buff)
      expect(attack).toBe(deefnceBase)
    })
  })

  describe('固定値バフ', () => {
    it('基礎値に加算される', () => {
      const fixedAddition = 200
      const buff = createDefenceBuff({ fixedAddition })
      const defence = buffedDefence(deefnceBase, buff)
      expect(defence).toBe(deefnceBase + fixedAddition)
    })
  })

  describe('割合バフ', () => {
    it('基礎値に割合加算される', () => {
      const percentageAddition = 1.3
      const buff = createDefenceBuff({ percentageAddition })
      const defence = buffedDefence(deefnceBase, buff)
      expect(defence).toBe(deefnceBase * percentageAddition)
    })
  })

  describe('固定値バフと割合バフの両方がある場合', () => {
    it('固定値が加算された後割合加算される', () => {
      const defenceBase = 792 // クオーラ 昇進2Lv80 信頼度ボーナス・潜在強化込み
      const fixedAddition = 65 // 黒き悪魔の加護 昇進2 潜在強化込み
      const percentageAddition = 2.3 + 1.12 // シェルガード 特化3 + 防御エキスパート 昇進2
      const expected = (defenceBase + fixedAddition) * percentageAddition // 一歩も引かないよ！

      const buff: DefenceBuff = {
        fixedAddition,
        percentageAddition,
      }
      const defence = buffedDefence(defenceBase, buff)
      expect(defence).toBe(expected)
    })
  })
})
