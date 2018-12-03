import MuiCancel from '@material-ui/icons/Cancel'
import React from 'react'
import { compose, withHandlers } from 'recompose'

const Cancel = ({ deleteResource, ...props }) => <MuiCancel {...props} onClick={deleteResource} />

export default compose(
  withHandlers({
    deleteResource: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(Cancel)
