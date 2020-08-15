export const totalDebuffFixed = (debuffs: number[]): number => {
  return debuffs.reduce((a, b) => a + b, 0)
}

export const totalDebuffPercentage = (debuffs: number[]): number => {
  return 1 - debuffs.reduce((a, b) => a * (1 - b), 1)
}
