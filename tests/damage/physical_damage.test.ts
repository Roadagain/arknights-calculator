import { physicalDamage, DamageBuff, minimumDamage } from '../../src/damage'

describe('物理ダメージ計算', () => {
  const createDamageBuff = (buff: Partial<DamageBuff>): DamageBuff => {
    return {
      percentageIncrease: 1,
      ...buff,
    }
  }

  describe('計算結果が最低ダメージ以上になる場合', () => {
    const attack = 550
    const defence = 300

    describe('バフなしの場合', () => {
      const buff = createDamageBuff({})

      it('攻撃力-防御力 がダメージになる', () => {
        const expected = attack - defence
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })

      it('小数点以下は四捨五入される', () => {
        const attackFloored = 500.4
        const expectedFloored = Math.floor(attackFloored - defence)
        const damageFloored = physicalDamage(attackFloored, defence, buff)
        expect(damageFloored).toBe(expectedFloored)

        const attackCeiled = 500.5
        const expectedCeiled = Math.ceil(attackCeiled - defence)
        const damageCeiled = physicalDamage(attackCeiled, defence, buff)
        expect(damageCeiled).toBe(expectedCeiled)
      })
    })

    describe('バフありの場合', () => {
      it('(攻撃力-防御力)*ダメージバフ がダメージになる', () => {
        const percentageIncrease = 1.3
        const expected = (attack - defence) * percentageIncrease
        const buff = createDamageBuff({ percentageIncrease })
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })

      it('小数点以下は四捨五入される', () => {
        const percentageIncreaseFloored = 1.04
        const expectedFloored = Math.floor((attack - defence) * percentageIncreaseFloored)
        const buffFloored = createDamageBuff({ percentageIncrease: percentageIncreaseFloored })
        const damageFloored = physicalDamage(attack, defence, buffFloored)
        expect(damageFloored).toBe(expectedFloored)

        const percentageIncreaseCeiled = 1.05
        const expectedCeiled = Math.ceil((attack - defence) * percentageIncreaseCeiled)
        const buffCeiled = createDamageBuff({ percentageIncrease: percentageIncreaseCeiled })
        const damageCeiled = physicalDamage(attack, defence, buffCeiled)
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
    const defence = 500
    const buff = createDamageBuff(partialBuff)

    describe(`${testcase}の場合`, () => {
      it('最低ダメージになる', () => {
        const expected = minimumDamage(attack)
        const damage = physicalDamage(attack, defence, buff)
        expect(damage).toBe(expected)
      })
    })
  })
})
