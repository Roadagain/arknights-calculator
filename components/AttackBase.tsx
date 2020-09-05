import React from 'react'
import { Grid } from '@material-ui/core'
import NumberForm from './NumberForm'

type Props = {
  value: number
  onChange: (value: number) => void
}

const AttackBase: React.FC<Props> = ({ value, onChange }: Props) => {
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>基礎攻撃力</Grid>
      <Grid item>
        <NumberForm value={value} onChange={onChange} />
      </Grid>
    </Grid>
  )
}

export default AttackBase
