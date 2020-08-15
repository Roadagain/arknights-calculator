export type AttackBuff = {
  readonly percentageAddition: number
  readonly fixedAddition: number
  readonly damageIncrease: number
  readonly attackIncrease: number
}

export const buffedAttack = (base: number, buff: AttackBuff): number => {
  const { fixedAddition, percentageAddition, damageIncrease, attackIncrease } = buff
  return (base * percentageAddition + fixedAddition) * damageIncrease * attackIncrease
}
