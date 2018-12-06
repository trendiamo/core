import MuiDelete from '@material-ui/icons/DeleteOutlined'
import React from 'react'
import { compose, withHandlers } from 'recompose'
import { IconButton } from '@material-ui/core'

const Cancel = ({ onClick, ...props }) => (
  <IconButton>
    <MuiDelete {...props} onClick={onClick} />
  </IconButton>
)

export default compose(
  withHandlers({
    onClick: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(Cancel)
