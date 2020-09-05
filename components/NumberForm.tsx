import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

type Props = {
  value: number
  isPercentage?: boolean
  onChange: (newValue: number) => void
}

const PercentageForm: React.FC<Props> = ({ value, isPercentage, onChange }: Props) => {
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || 0
    onChange(newValue)
  }

  return (
    <TextField
      type="number"
      value={value}
      onChange={onChangeValue}
      InputProps={{
        endAdornment: isPercentage ? <InputAdornment position="end">%</InputAdornment> : undefined,
      }}
    />
  )
}

export default PercentageForm
