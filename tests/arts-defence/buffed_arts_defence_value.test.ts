import { ArtsDefenceBuff, buffedArtsDefence } from '../../src/arts-defence'

describe('術耐性バフの計算', () => {
  const artsDefenceBase = 10
  const createArtsDefenceBuff = (buff: Partial<ArtsDefenceBuff>): ArtsDefenceBuff => {
    return {
      fixedAddition: 0,
      percentageAddition: 1,
      ...buff,
    }
  }

  describe('バフなしの場合', () => {
    it('基礎値がそのまま術耐性になる', () => {
      const buff = createArtsDefenceBuff({})
      const attack = buffedArtsDefence(artsDefenceBase, buff)
      expect(attack).toBe(artsDefenceBase)
    })
  })

  describe('固定値バフ', () => {
    it('基礎値に加算される', () => {
      const fixedAddition = 10
      const buff = createArtsDefenceBuff({ fixedAddition })
      const artsDefence = buffedArtsDefence(artsDefenceBase, buff)
      expect(artsDefence).toBe(artsDefenceBase + fixedAddition)
    })
  })

  describe('割合バフ', () => {
    it('基礎値に割合加算される', () => {
      const percentageAddition = 1.2
      const buff = createArtsDefenceBuff({ percentageAddition })
      const artsDefence = buffedArtsDefence(artsDefenceBase, buff)
      expect(artsDefence).toBe(artsDefenceBase * percentageAddition)
    })
  })

  describe('固定値バフと割合バフの両方がある場合', () => {
    it('固定値が加算された後割合加算される', () => {
      const artsDefenceBase = 5 // マッターホルン 昇進2Lv80 信頼度ボーナス・潜在強化込み
      const fixedAddition = 15 + 17 // 雪原の衛士 昇進2 + 白き悪魔の加護 昇進2 潜在強化込み
      const percentageAddition = 2 + 2.5 // 寒冷順化 特化III + 聖域 特化III
      const expected = (artsDefenceBase + fixedAddition) * percentageAddition // 力押しだけと思うな

      const buff: ArtsDefenceBuff = {
        fixedAddition,
        percentageAddition,
      }
      const artsDefence = buffedArtsDefence(artsDefenceBase, buff)
      expect(artsDefence).toBe(expected)
    })
  })
})
