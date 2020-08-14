import Attack from '../src/attack'

describe('攻撃力', () => {
  describe('最終攻撃力の計算', () => {
    it('バフなしの場合', () => {
      const attack = new Attack(100)
      expect(attack.value).toBe(100)
    })

    it('固定値バフのみの場合', () => {
      const attack = new Attack(100, [10])
      expect(attack.value).toBe(110)
    })

    it('攻撃力がn%上昇 のみ', () => {
      const attack = new Attack(100, [], [1.1])
      expect(attack.value).toBe(110)
    })

    it('攻撃力のn%のダメージ のみ', () => {
      const attack = new Attack(100, [], [], [1.1])
      expect(attack.value).toBe(110)
    })

    it('攻撃力がn%まで上昇 のみ', () => {
      const attack = new Attack(100, [], [], [1.1])
      expect(attack.value).toBe(110)
    })
  })
})
