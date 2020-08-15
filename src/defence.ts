export type DefenceBuff = {
  readonly fixedAddition: number
  readonly percentageAddition: number
}

export const buffedDefence = (base: number, buff: DefenceBuff): number => {
  return (base + buff.fixedAddition) * buff.percentageAddition
}

export type DefenceDebuff = {
  readonly fixedSubtraction: number
  readonly percentageSubtraction: number
}

export const debuffedDefence = (base: number, debuff: DefenceDebuff): number => {
  return (base - debuff.fixedSubtraction) * (1 - debuff.percentageSubtraction)
}
