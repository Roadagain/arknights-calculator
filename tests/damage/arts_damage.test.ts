import { artsDamage, DamageBuff, minimumDamage } from '../../src/damage'

describe('術ダメージ計算', () => {
  const createDamageBuff = (buff: Partial<DamageBuff>): DamageBuff => {
    return {
      percentageIncrease: 1,
      ...buff,
    }
  }

  describe('計算結果が最低ダメージ以上になる場合', () => {
    const attack = 550
    const artsDefence = 40

    describe('バフなしの場合', () => {
      const buff = createDamageBuff({})

      it('攻撃力*(1-術耐性/100) がダメージになる', () => {
        const expected = attack * (1 - artsDefence / 100)
        const damage = artsDamage(attack, artsDefence, buff)
        expect(damage).toBe(expected)
      })

      it('小数点以下は四捨五入される', () => {
        const attackFloored = 502
        const expectedFloored = Math.floor(attackFloored * (1 - artsDefence / 100))
        const damageFloored = artsDamage(attackFloored, artsDefence, buff)
        expect(damageFloored).toBe(expectedFloored)

        const attackCeiled = 503
        const expectedCeiled = Math.ceil(attackCeiled * (1 - artsDefence / 100))
        const damageCeiled = artsDamage(attackCeiled, artsDefence, buff)
        expect(damageCeiled).toBe(expectedCeiled)
      })
    })

    describe('バフありの場合', () => {
      it('攻撃力*(1-術耐性/100)*ダメージバフ がダメージになる', () => {
        const percentageIncrease = 1.3
        const expected = attack * (1 - artsDefence / 100) * percentageIncrease
        const buff = createDamageBuff({ percentageIncrease })
        const damage = artsDamage(attack, artsDefence, buff)
        expect(damage).toBe(expected)
      })

      it('小数点以下は四捨五入される', () => {
        const percentageIncreaseFloored = 1.04
        const expectedFloored = Math.floor(attack * (1 - artsDefence / 100) * percentageIncreaseFloored)
        const buffFloored = createDamageBuff({ percentageIncrease: percentageIncreaseFloored })
        const damageFloored = artsDamage(attack, artsDefence, buffFloored)
        expect(damageFloored).toBe(expectedFloored)

        const percentageIncreaseCeiled = 1.05
        const expectedCeiled = Math.ceil(attack * (1 - artsDefence / 100) * percentageIncreaseCeiled)
        const buffCeiled = createDamageBuff({ percentageIncrease: percentageIncreaseCeiled })
        const damageCeiled = artsDamage(attack, artsDefence, buffCeiled)
        expect(damageCeiled).toBe(expectedCeiled)
      })
    })
  })

  describe.each`
    testcase      | partialBuff
    ${'バフなし'} | ${{}}
    ${'バフあり'} | ${{ percentageIncrease: 1.2 }}
  `('計算結果が最低ダメージを下回る場合', ({ testcase, partialBuff }) => {
    const attack = 500
    const artsDefence = 100
    const buff = createDamageBuff(partialBuff)

    describe(`${testcase}の場合`, () => {
      it('最低ダメージになる', () => {
        const expected = minimumDamage(attack)
        const damage = artsDamage(attack, artsDefence, buff)
        expect(damage).toBe(expected)
      })
    })
  })
})
