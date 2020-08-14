export type AttackBuff = {
  readonly percentageAddition: number
  readonly fixedAddition: number
  readonly damageIncrease: number
  readonly percentageIncrease: number
}

export const buffedAttackValue = (base: number, buff: AttackBuff): number => {
  const { fixedAddition, percentageAddition, damageIncrease, percentageIncrease } = buff
  return (base * percentageAddition + fixedAddition) * damageIncrease * percentageIncrease
}
