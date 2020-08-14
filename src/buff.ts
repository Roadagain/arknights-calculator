export const totalBuffPercentage = (buffPercentages: number[]): number => {
  return buffPercentages.reduce((a, b) => a + b, 0) - buffPercentages.length + 1
}

export const totalBuffFixed = (buffsFixed: number[]): number => {
  return buffsFixed.reduce((a, b) => a + b, 0)
}
