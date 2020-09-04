import React from 'react'
import { Grid } from '@material-ui/core'
import NamedBuffList from './NamedBuffList'

const AttackBuff: React.FC = () => {
  const [percentageAdditions, setPercentageAdditions] = React.useState<number[]>([])
  const [fixedAdditions, setFixedAdditions] = React.useState<number[]>([])
  const [damageIncreases, setDamageIncreases] = React.useState<number[]>([])
  const [attackIncreases, setAttackIncreases] = React.useState<number[]>([])

  return (
    <Grid container spacing={2}>
      <Grid item>(</Grid>
      <Grid item xs={2}>
        <NamedBuffList
          name="攻撃力+n%"
          buffType="percentage"
          buffs={percentageAdditions}
          onChange={setPercentageAdditions}
        />
      </Grid>
      <Grid item>+</Grid>
      <Grid item xs={2}>
        <NamedBuffList name="攻撃力にnを加算" buffType="fixed" buffs={fixedAdditions} onChange={setFixedAdditions} />
      </Grid>
      <Grid item>)</Grid>
      <Grid item>×</Grid>
      <Grid item xs={2}>
        <NamedBuffList
          name="攻撃力のn%のダメージ"
          buffType="percentage"
          buffs={damageIncreases}
          onChange={setDamageIncreases}
        />
      </Grid>
      <Grid item>×</Grid>
      <Grid item xs={2}>
        <NamedBuffList
          name="攻撃力がn%まで上昇"
          buffType="percentage"
          buffs={attackIncreases}
          onChange={setAttackIncreases}
        />
      </Grid>
    </Grid>
  )
}

export default AttackBuff
