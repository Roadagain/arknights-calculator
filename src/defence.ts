export type DefenceBuff = {
  readonly fixedAddition: number
  readonly percentageAddition: number
}

export const buffedDefence = (base: number, buff: DefenceBuff): number => {
  return (base + buff.fixedAddition) * buff.percentageAddition
}
