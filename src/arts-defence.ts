export type ArtsDefenceBuff = {
  readonly fixedAddition: number
  readonly percentageAddition: number
}

export const buffedArtsDefence = (base: number, buff: ArtsDefenceBuff): number => {
  return (base + buff.fixedAddition) * buff.percentageAddition
}

export type ArtsDefenceDebuff = {
  readonly fixedSubtraction: number
  readonly percentageSubtraction: number
}

export const debuffedArtsDefence = (base: number, debuff: ArtsDefenceDebuff): number => {
  return (base - debuff.fixedSubtraction) * (1 - debuff.percentageSubtraction)
}
