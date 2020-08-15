export type ArtsDefenceBuff = {
  readonly fixedAddition: number
  readonly percentageAddition: number
}

export const buffedArtsDefence = (base: number, buff: ArtsDefenceBuff): number => {
  return (base + buff.fixedAddition) * buff.percentageAddition
}
