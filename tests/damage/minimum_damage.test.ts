import { minimumDamage } from '../../src/damage'

describe('最低ダメージの計算', () => {
  it('攻撃力の5%になる', () => {
    const attack = 300
    const expected = attack / 20
    const damage = minimumDamage(attack)
    expect(damage).toBe(expected)
  })

  it('小数点以下は四捨五入される', () => {
    const attackFloored = 408
    const expectedFloored = Math.round(attackFloored / 20)
    const damageFloored = minimumDamage(attackFloored)
    expect(damageFloored).toBe(expectedFloored)

    const attackCeiled = 410
    const expectedCeiled = Math.round(attackCeiled / 20)
    const damageCeiled = minimumDamage(attackCeiled)
    expect(damageCeiled).toBe(expectedCeiled)
  })
})
