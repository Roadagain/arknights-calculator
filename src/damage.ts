export type DamageBuff = {
  readonly percentageIncrease: number
}

export const physicalDamage = (attack: number, defence: number, buff: DamageBuff): number => {
  const minimumDamage = Math.round(attack / 20) // 攻撃力の5%
  const damage = Math.round((attack - defence) * buff.percentageIncrease)
  return Math.max(minimumDamage, damage)
}
