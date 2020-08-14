import Attack from '../../src/attack'
import AttackBuff, { IAttackBuff } from '../../src/attack-buff'

const attackBase = 100
export const createAttackBuff = (buff: Partial<IAttackBuff> = {}): AttackBuff => {
  const defaultBuff: IAttackBuff = {
    attackPlussesPercentage: [],
    attackPlussesFixed: [],
    damageBuffs: [],
    attackBuffs: [],
  }

  const { attackPlussesPercentage, attackPlussesFixed, damageBuffs, attackBuffs } = { ...defaultBuff, ...buff }
  return new AttackBuff(attackPlussesPercentage, attackPlussesFixed, damageBuffs, attackBuffs)
}

describe('最終攻撃力の計算', () => {
  describe('バフなしの場合', () => {
    it('基礎値がそのまま攻撃力になる', () => {
      const buff = createAttackBuff()
      const attack = new Attack(attackBase, buff)
      expect(attack.value).toBe(attackBase)
    })
  })

  describe.each`
  buffName | buff | expected
  ${'攻撃力にnを加算'} | ${createAttackBuff({ attackPlussesFixed: [10] })} | ${110}
  `('加算バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に加算される`, () => {
      const attack = new Attack(attackBase, buff)
      expect(attack.value).toBe(expected)
    })
  })

  describe.each`
  buffName | buff | expected
  ${'攻撃力+n%'} | ${createAttackBuff({ attackPlussesPercentage: [1.1] })} | ${110}
  ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ damageBuffs: [1.1] })} | ${110}
  ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackBuffs: [1.1] })} | ${110}
  `('割合バフ', ({ buffName, buff, expected }) => {
    it(`${buffName} は基礎値に割合加算される`, () => {
      const attack = new Attack(attackBase, buff)
      expect(attack.value).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力+n%'} | ${createAttackBuff({ attackPlussesFixed: [10], attackPlussesPercentage: [1.1] })} | ${120}
  `('加算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const attack = new Attack(attackBase, buff)
      expect(attack.value).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buff | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlussesFixed: [10], damageBuffs: [1.1] })} | ${121}
  ${ '攻撃力にnを加算'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlussesFixed: [10], attackBuffs: [1.1] })} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力のn%のダメージ'} | ${createAttackBuff({ attackPlussesPercentage: [1.1], damageBuffs: [1.1] })} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ attackPlussesPercentage: [1.1], attackBuffs: [1.1] })} | ${121}
  ${ '攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'} | ${createAttackBuff({ damageBuffs: [1.1], attackBuffs: [1.1] })} | ${121}
  `('乗算されるバフの組み合わせ', ({ buffNameA, buffNameB, buff, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const attack = new Attack(attackBase, buff)
      expect(attack.value).toBe(expected)
    })
  })
})
