export type AttackBuff = {
  readonly attackPlusPercentage: number
  readonly attackPlusFixed: number
  readonly damageBuff: number
  readonly attackBuff: number
}

export const buffedAttackValue = (base: number, buff: AttackBuff): number => {
  const { attackPlusFixed, attackPlusPercentage, damageBuff, attackBuff } = buff
  return Math.floor((base * attackPlusPercentage + attackPlusFixed) * damageBuff * attackBuff)
}
