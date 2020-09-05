import React from 'react'
import { Grid } from '@material-ui/core'
import BuffList from './BuffList'
import { totalBuffPercentage, totalBuffFixed } from '../src/buff'

type BuffType = 'percentage' | 'fixed'

type Props = {
  name: string
  buffType: BuffType
  isZeroBase?: boolean
  buffs: number[]
  onChange: (newBuffs: number[]) => void
}

type BuffCalculator = (buffs: number[], isZeroBase?: boolean) => number

const totalBuffCalculator: { [K in BuffType]: BuffCalculator } = {
  percentage: totalBuffPercentage,
  fixed: totalBuffFixed,
}

const buffSuffix: { [K in BuffType]: string } = {
  percentage: '%',
  fixed: '',
}

const NamedBuffList: React.FC<Props> = ({ name, buffType, isZeroBase, buffs, onChange }: Props) => {
  const totalBuffValue = totalBuffCalculator[buffType](buffs, isZeroBase)
  const suffix = buffSuffix[buffType]
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>{name}</Grid>
      <Grid item>
        {totalBuffValue}
        {suffix}
      </Grid>
      <Grid item>
        <BuffList buffType={buffType} buffs={buffs} onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default NamedBuffList
