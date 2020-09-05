import React from 'react'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

type Props = {
  onClick: () => void
}

const AddButton: React.FC<Props> = ({ onClick }: Props) => (
  <Button variant="outlined" onClick={onClick}>
    <AddIcon />
  </Button>
)

export default AddButton
