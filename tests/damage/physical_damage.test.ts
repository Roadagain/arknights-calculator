import { physicalDamage, DamageBuff, minimumDamage } from '../../src/damage'

describe('物理ダメージ計算', () => {
  const createDamageBuff = (buff: Partial<DamageBuff>): DamageBuff => {
    return {
      percentageIncrease: 1,
      ...buff,
    }
  }

  describe('計算結果が最低ダメージ以上になる場合', () => {
    const attack = 500
    const defence = 300

    describe('バフなしだった場合', () => {
      it('攻撃力-防御力 がダメージになる', () => {
        const buff = createDamageBuff({})
        const expected = attack - defence
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })
    })

    describe('バフありだった場合', () => {
      it('(攻撃力-防御力)*ダメージバフ がダメージになる', () => {
        const percentageIncrease = 1.3
        const expected = (attack - defence) * percentageIncrease
        const buff = createDamageBuff({ percentageIncrease })
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })
    })
  })

  describe.each`
    testcase      | partialBuff
    ${'バフなし'} | ${{}}
    ${'バフあり'} | ${{ percentageIncrease: 1.2 }}
  `('計算結果が最低ダメージを下回る場合', ({ testcase, partialBuff }) => {
    const attack = 500
    const defence = 500
    const buff = createDamageBuff(partialBuff)

    describe(`${testcase}だった場合`, () => {
      it('最低ダメージになる', () => {
        const expected = minimumDamage(attack)
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })
    })
  })
})
