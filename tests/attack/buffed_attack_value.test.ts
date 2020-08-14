import { buffedAttackValue, AttackBuff } from '../../src/attack'

describe('最終攻撃力の計算', () => {
  const attackBase = 500
  const createAttackBuff = (buff: Partial<AttackBuff> = {}): AttackBuff => {
    return {
      percentageAddition: 1,
      fixedAddition: 0,
      damageIncrease: 1,
      percentageIncrease: 1,
      ...buff,
    }
  }

  describe('バフなしの場合', () => {
    it('基礎値がそのまま攻撃力になる', () => {
      const buff = createAttackBuff()
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(attackBase)
    })
  })

  describe.each`
    buffName             | buff                                        | expected
    ${'攻撃力にnを加算'} | ${createAttackBuff({ fixedAddition: 200 })} | ${700}
  `('加算バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffName                  | buff                                             | expected
    ${'攻撃力+n%'}            | ${createAttackBuff({ percentageAddition: 1.5 })} | ${750}
    ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ damageIncrease: 1.5 })}     | ${750}
    ${'攻撃力がn%まで上昇'}   | ${createAttackBuff({ percentageIncrease: 1.5 })} | ${750}
  `('割合バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に割合加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffNameA            | buffNameB      | buff                                                                 | expected
    ${'攻撃力にnを加算'} | ${'攻撃力+n%'} | ${createAttackBuff({ fixedAddition: 200, percentageAddition: 1.5 })} | ${950}
  `('加算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffNameA                 | buffNameB                 | buff                                                                      | expected
    ${'攻撃力にnを加算'}      | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ fixedAddition: 200, damageIncrease: 1.5 })}          | ${1050}
    ${'攻撃力にnを加算'}      | ${'攻撃力がn%まで上昇'}   | ${createAttackBuff({ fixedAddition: 200, percentageIncrease: 1.5 })}      | ${1050}
    ${'攻撃力+n%'}            | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ percentageAddition: 1.5, damageIncrease: 1.5 })}     | ${1125}
    ${'攻撃力+n%'}            | ${'攻撃力がn%まで上昇'}   | ${createAttackBuff({ percentageAddition: 1.5, percentageIncrease: 1.5 })} | ${1125}
    ${'攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'}   | ${createAttackBuff({ damageIncrease: 1.5, percentageIncrease: 1.5 })}     | ${1125}
  `('乗算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe('バフ全部盛り', () => {
    const buff: AttackBuff = {
      percentageAddition: 1.9, // 不安定血漿 特化III
      fixedAddition: 385, // ファイトソング 特化III 昇進2Lv80 信頼度ボーナス込み
      damageIncrease: 3, // 爆撃要請 特化III
      percentageIncrease: 1.45, // 暗殺者 昇進2 潜在強化込み
    }
    const attackBase = 1175 // ファイヤーウォッチ 昇進2Lv80 信頼度ボーナス込み

    it('個々のバフを考慮して攻撃力が計算される', () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(11386.125) // ファイヤー
    })
  })
})
