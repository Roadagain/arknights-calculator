export type DefenceBuff = {
  readonly fixedAddition: number
  readonly percentageAddition: number
}

export const buffedDefenceValue = (base: number, buff: DefenceBuff): number => {
  return (base + buff.fixedAddition) * buff.percentageAddition
}
