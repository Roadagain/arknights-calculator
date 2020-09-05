import React from 'react'
import { Grid } from '@material-ui/core'
import AddButton from './AddButton'
import PercentageForm from './PercentageForm'
import RemoveButton from './RemoveButton'

type Props = {
  buffType: 'percentage' | 'fixed'
  buffs: number[]
  onChange: (newBuffs: number[]) => void
}

const BuffList: React.FC<Props> = ({ buffType, buffs, onChange }: Props) => {
  const onChangeByIndex = (newBuff: number, changedIndex: number) => {
    const newBuffs = buffs.map((value, index) => (index === changedIndex ? newBuff : value))
    onChange(newBuffs)
  }
  const onAdd = () => {
    onChange([...buffs, 0])
  }
  const onRemove = (removedIndex: number) => {
    const newBuffs = buffs.filter((_, index) => index !== removedIndex)
    onChange(newBuffs)
  }

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      {buffs.map((buff, index) => {
        const onChangeValue = (newBuff: number) => onChangeByIndex(newBuff, index)
        const onRemoveItem = () => onRemove(index)
        return (
          <Grid item key={index}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <PercentageForm value={buff} isPercentage={buffType === 'percentage'} onChange={onChangeValue} />
              </Grid>
              <Grid item xs={3}>
                <RemoveButton onClick={onRemoveItem} />
              </Grid>
            </Grid>
          </Grid>
        )
      })}
      <Grid item>
        <AddButton onClick={onAdd} />
      </Grid>
    </Grid>
  )
}

export default BuffList
