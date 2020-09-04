import React from 'react'
import { Button } from '@material-ui/core'

type Props = {
  onClick: () => void
}

const AddButton: React.FC<Props> = ({ onClick }: Props) => (
  <Button variant="contained" onClick={onClick}>
    追加
  </Button>
)

export default AddButton
