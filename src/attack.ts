import AttackBuff from './attack-buff'

export default class Attack {
  constructor(
    readonly attackBase: number,
    readonly attackBuff: AttackBuff
  ) { }

  public get value(): number {
    const { attackPlusFixed, attackPlusPercentage, damageBuff, attackBuff } = this.attackBuff
    return Math.floor((this.attackBase * attackPlusPercentage + attackPlusFixed) * damageBuff * attackBuff)
  }
}
