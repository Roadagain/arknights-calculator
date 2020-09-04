import React from 'react'
import { Grid } from '@material-ui/core'
import BuffList from './BuffList'

type Props = {
  name: string
  buffType: 'percentage' | 'fixed'
  buffs: number[]
  onChange: (newBuffs: number[]) => void
}

const NamedBuffList: React.FC<Props> = ({ name, buffType, buffs, onChange }: Props) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>{name}</Grid>
      <Grid item>
        <BuffList buffType={buffType} buffs={buffs} onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default NamedBuffList
