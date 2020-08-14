import Attack from '../../src/attack'

describe('最終攻撃力の計算', () => {
  describe('バフなしの場合', () => {
    it('基礎値がそのまま攻撃力になる', () => {
      const attack = new Attack(100)
      expect(attack.value).toBe(100)
    })
  })

  describe('攻撃力にnを加算', () => {
    it('基礎値に加算される', () => {
      const attack = new Attack(100, [10])
      expect(attack.value).toBe(110)
    })
  })

  describe('攻撃力+n%', () => {
    it('基礎値に乗算される', () => {
      const attack = new Attack(100, [], [1.1])
      expect(attack.value).toBe(110)
    })
  })

  describe('攻撃力のn%のダメージ', () => {
    it('基礎値に乗算される', () => {
      const attack = new Attack(100, [], [], [1.1])
      expect(attack.value).toBe(110)
    })
  })

  describe('攻撃力がn%まで上昇', () => {
    it('基礎値に乗算される', () => {
      const attack = new Attack(100, [], [], [1.1])
      expect(attack.value).toBe(110)
    })
  })

  const defaultBuffs = {
    attackPlussesFixed: [],
    attackPlussesPercentage: [],
    damageBuffs: [],
    attackBuffs: [],
  }

  describe.each`
  buffNameA | buffNameB | buffs | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力+n%'} | ${{ ...defaultBuffs, attackPlussesFixed: [10], attackPlussesPercentage: [1.1] }} | ${120}
  `('加算バフの組み合わせ', ({ buffNameA, buffNameB, buffs, expected }) => {
    it(`${buffNameA} と ${buffNameB} は加算される`, () => {
      const { attackPlussesFixed, attackPlussesPercentage, damageBuffs, attackBuffs } = buffs
      const attack = new Attack(100, attackPlussesFixed, attackPlussesPercentage, damageBuffs, attackBuffs)
      expect(attack.value).toBe(expected)
    })
  })

  describe.each`
  buffNameA | buffNameB | buffs | expected
  ${ '攻撃力にnを加算'} | ${'攻撃力のn%のダメージ'} | ${{ ...defaultBuffs, attackPlussesFixed: [10], damageBuffs: [1.1] }} | ${121}
  ${ '攻撃力にnを加算'} | ${'攻撃力がn%まで上昇'} | ${{ ...defaultBuffs, attackPlussesFixed: [10], attackBuffs: [1.1] }} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力のn%のダメージ'} | ${{ ...defaultBuffs, attackPlussesPercentage: [1.1], damageBuffs: [1.1] }} | ${121}
  ${ '攻撃力+n%'} | ${'攻撃力がn%まで上昇'} | ${{ ...defaultBuffs, attackPlussesPercentage: [1.1], attackBuffs: [1.1] }} | ${121}
  ${ '攻撃力のn%のダメージ'} | ${'攻撃力がn%まで上昇'} | ${{ ...defaultBuffs, damageBuffs: [1.1], attackBuffs: [1.1] }} | ${121}
  `('乗算バフの組み合わせ', ({ buffNameA, buffNameB, buffs, expected }) => {
    it(`${buffNameA} と ${buffNameB} は乗算される`, () => {
      const { attackPlussesFixed, attackPlussesPercentage, damageBuffs, attackBuffs } = buffs
      const attack = new Attack(100, attackPlussesFixed, attackPlussesPercentage, damageBuffs, attackBuffs)
      expect(attack.value).toBe(expected)
    })
  })
})
