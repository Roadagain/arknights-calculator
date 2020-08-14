import { buffedAttackValue, AttackBuff } from '../../src/attack'

const attackBase = 100
export const createAttackBuff = (buff: Partial<AttackBuff> = {}): AttackBuff => {
  return {
    attackPlusPercentage: 1,
    attackPlusFixed: 0,
    damageBuff: 1,
    attackBuff: 1,
    ...buff
  }
}

describe('最終攻撃力の計算', () => {
  describe('バフなしの場合', () => {
    it('基礎値がそのまま攻撃力になる', () => {
      const buff = createAttackBuff()
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(attackBase)
    })
  })

  describe.each`
  buffName | buff | expected
  ${'攻撃力にnを加算'} | ${createAttackBuff({ attackPlusFixed: 10 })} | ${110}
  `('加算バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffName | buff | expected
  ${'攻撃力+n%'} | ${createAttackBuff({ attackPlusPercentage: 1.1 })} | ${110}
  ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ damageBuff: 1.1 })} | ${110}
  ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackBuff: 1.1 })} | ${110}
  `('割合バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に割合加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力+n%'} | ${createAttackBuff({ attackPlusFixed: 10, attackPlusPercentage: 1.1 })} | ${120}
  `('加算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlusFixed: 10, damageBuff: 1.1 })} | ${121}
  ${ '攻撃力にnを加算'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlusFixed: 10, attackBuff: 1.1 })} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlusPercentage: 1.1, damageBuff: 1.1 })} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlusPercentage: 1.1, attackBuff: 1.1 })} | ${121}
  ${ '攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ damageBuff: 1.1, attackBuff: 1.1 })} | ${121}
  `('乗算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })
})
