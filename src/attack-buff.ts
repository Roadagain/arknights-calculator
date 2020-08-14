import { totalBuffPercentage, totalBuffFixed } from './buff'

export type IAttackBuff = {
  readonly attackPlussesPercentage: number[]
  readonly attackPlussesFixed: number[]
  readonly damageBuffs: number[]
  readonly attackBuffs: number[]
}

export default class AttackBuff implements IAttackBuff {
  public constructor(
    readonly attackPlussesPercentage: number[] = [],
    readonly attackPlussesFixed: number[] = [],
    readonly damageBuffs: number[] = [],
    readonly attackBuffs: number[] = [],
  ) { }

  public get attackPlusPercentage(): number {
    return totalBuffPercentage(this.attackPlussesPercentage)
  }

  public get attackPlusFixed(): number {
    return totalBuffFixed(this.attackPlussesFixed)
  }

  public get damageBuff(): number {
    return totalBuffPercentage(this.damageBuffs)
  }

  public get attackBuff(): number {
    return totalBuffPercentage(this.attackBuffs)
  }
}
