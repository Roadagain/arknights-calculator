export const totalBuffPercentage = (buffPercentages: number[], isZeroBase?: boolean): number => {
  const base = isZeroBase ? 0 : 100
  return buffPercentages.reduce((a, b) => a + b, base) - buffPercentages.length * base
}

export const totalBuffFixed = (buffsFixed: number[]): number => {
  return buffsFixed.reduce((a, b) => a + b, 0)
}
