export type DamageBuff = {
  readonly percentageIncrease: number
}

export const minimumDamage = (attack: number): number => {
  return Math.round(attack / 20) // 攻撃力の5%
}

export const physicalDamage = (attack: number, defence: number, buff: DamageBuff): number => {
  const damage = Math.round((attack - defence) * buff.percentageIncrease)
  return Math.max(minimumDamage(attack), damage)
}

export const artsDamage = (attack: number, artsDefence: number, buff: DamageBuff): number => {
  const damage = Math.round(attack * (1 - artsDefence / 100) * buff.percentageIncrease)
  return Math.max(minimumDamage(attack), damage)
}
