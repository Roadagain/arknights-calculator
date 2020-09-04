import React from 'react'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

type Props = {
  onClick: () => void
}

const RemoveButton: React.FC<Props> = ({ onClick }: Props) => (
  <Button size="small" onClick={onClick}>
    <DeleteIcon />
  </Button>
)

export default RemoveButton
