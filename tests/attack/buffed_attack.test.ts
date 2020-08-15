import { buffedAttack, AttackBuff } from '../../src/attack'

describe('攻撃力バフの計算', () => {
  const attackBase = 500
  const createAttackBuff = (buff: Partial<AttackBuff> = {}): AttackBuff => {
    return {
      percentageAddition: 1,
      fixedAddition: 0,
      damageIncrease: 1,
      attackIncrease: 1,
      ...buff,
    }
  }

  describe('バフなしの場合', () => {
    it('基礎値がそのまま攻撃力になる', () => {
      const buff = createAttackBuff()
      const attack = buffedAttack(attackBase, buff)
      expect(attack).toBe(attackBase)
    })
  })

  describe.each`
    buffName             | buff                      | expected
    ${'攻撃力にnを加算'} | ${{ fixedAddition: 200 }} | ${700}
  `('加算バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に加算される`, () => {
      const attackBuff = createAttackBuff(buff)
      const attack = buffedAttack(attackBase, attackBuff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffName                  | buff                           | expected
    ${'攻撃力+n%'}            | ${{ percentageAddition: 1.5 }} | ${750}
    ${'攻撃力のn%のダメージ'} | ${{ damageIncrease: 1.5 }}     | ${750}
    ${'攻撃力がn%まで上昇'}   | ${{ attackIncrease: 1.5 }}     | ${750}
  `('割合バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に割合加算される`, () => {
      const attackBuff = createAttackBuff(buff)
      const attack = buffedAttack(attackBase, attackBuff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffNameA            | buffNameB      | buff                                               | expected
    ${'攻撃力にnを加算'} | ${'攻撃力+n%'} | ${{ fixedAddition: 200, percentageAddition: 1.5 }} | ${950}
  `('加算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const attackBuff = createAttackBuff(buff)
      const attack = buffedAttack(attackBase, attackBuff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
    buffNameA                 | buffNameB                 | buff                                                | expected
    ${'攻撃力にnを加算'}      | ${'攻撃力のn%のダメージ'} | ${{ fixedAddition: 200, damageIncrease: 1.5 }}      | ${1050}
    ${'攻撃力にnを加算'}      | ${'攻撃力がn%まで上昇'}   | ${{ fixedAddition: 200, attackIncrease: 1.5 }}      | ${1050}
    ${'攻撃力+n%'}            | ${'攻撃力のn%のダメージ'} | ${{ percentageAddition: 1.5, damageIncrease: 1.5 }} | ${1125}
    ${'攻撃力+n%'}            | ${'攻撃力がn%まで上昇'}   | ${{ percentageAddition: 1.5, attackIncrease: 1.5 }} | ${1125}
    ${'攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'}   | ${{ damageIncrease: 1.5, attackIncrease: 1.5 }}     | ${1125}
  `('乗算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const attackBuff = createAttackBuff(buff)
      const attack = buffedAttack(attackBase, attackBuff)
      expect(attack).toBe(expected)
    })
  })

  describe('全種類のバフがある場合', () => {
    it('個々のバフを考慮して攻撃力が計算される', () => {
      const attackBase = 1175 // ファイヤーウォッチ 昇進2Lv80 信頼度ボーナス込み
      const percentageAddition = 1.9 // 不安定血漿 特化III
      const fixedAddition = 385 // ファイトソング 特化III 昇進2Lv80 信頼度ボーナス込み
      const damageIncrease = 3 // 爆撃要請 特化III
      const attackIncrease = 1.45 // 暗殺者 昇進2 潜在強化込み
      const expected = (attackBase * percentageAddition + fixedAddition) * damageIncrease * attackIncrease // ファイヤー

      const buff: AttackBuff = {
        percentageAddition,
        fixedAddition,
        damageIncrease,
        attackIncrease,
      }
      const attack = buffedAttack(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })
})
