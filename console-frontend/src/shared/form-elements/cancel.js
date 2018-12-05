import MuiCancel from '@material-ui/icons/Cancel'
import React from 'react'
import { compose, withHandlers } from 'recompose'

const Cancel = ({ onClick, ...props }) => <MuiCancel {...props} onClick={onClick} />

export default compose(
  withHandlers({
    onClick: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(Cancel)
