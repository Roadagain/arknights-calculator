import { buffedAttackValue, AttackBuff } from '../../src/attack'

const attackBase = 500
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
  ${'攻撃力にnを加算'} | ${createAttackBuff({ attackPlusFixed: 200 })} | ${700}
  `('加算バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffName | buff | expected
  ${'攻撃力+n%'} | ${createAttackBuff({ attackPlusPercentage: 1.5 })} | ${750}
  ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ damageBuff: 1.5 })} | ${750}
  ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackBuff: 1.5 })} | ${750}
  `('割合バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に割合加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力+n%'} | ${createAttackBuff({ attackPlusFixed: 200, attackPlusPercentage: 1.5 })} | ${950}
  `('加算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlusFixed: 200, damageBuff: 1.5 })} | ${1050}
  ${ '攻撃力にnを加算'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlusFixed: 200, attackBuff: 1.5 })} | ${1050}
  ${ '攻撃力+n%'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlusPercentage: 1.5, damageBuff: 1.5 })} | ${1125}
  ${ '攻撃力+n%'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlusPercentage: 1.5, attackBuff: 1.5 })} | ${1125}
  ${ '攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ damageBuff: 1.5, attackBuff: 1.5 })} | ${1125}
  `('乗算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const attack = buffedAttackValue(attackBase, buff)
      expect(attack).toBe(expected)
    })
  })
})
