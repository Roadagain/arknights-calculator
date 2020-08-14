import { totalBuffPercentage, totalBuffFixed } from './buff'

export default class Attack {
  constructor(
    readonly attackBase: number,
    private attackPlussesFixed: number[] = [],
    private attackPlussesPercentage: number[] = [],
    private damageBuffs: number[] = [],
    private attackBuffs: number[] = [],
  ) { }

  public get attackPlusFixed(): number {
    return totalBuffFixed(this.attackPlussesFixed)
  }

  public get attackPlusPercentage(): number {
    return totalBuffPercentage(this.attackPlussesPercentage)
  }

  public get damageBuff(): number {
    return totalBuffPercentage(this.damageBuffs)
  }

  public get attackBuff(): number {
    return totalBuffPercentage(this.attackBuffs)
  }

  public get value(): number {
    return Math.floor((this.attackBase * this.attackPlusPercentage + this.attackPlusFixed) * this.damageBuff * this.attackBuff)
  }
}
