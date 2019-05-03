import MuiDelete from '@material-ui/icons/DeleteOutlined'
import React from 'react'
import { compose, onlyUpdateForKeys, withHandlers } from 'recompose'
import { IconButton } from '@material-ui/core'

const Cancel = ({ onClick, ...props }) => (
  <IconButton onClick={onClick}>
    <MuiDelete {...props} />
  </IconButton>
)

export default compose(
  onlyUpdateForKeys(['disabled', 'index']),
  withHandlers({
    onClick: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(Cancel)
