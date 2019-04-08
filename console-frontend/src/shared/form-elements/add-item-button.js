import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import InlineTypography from './inline-typography'
import React from 'react'
import { Button } from '@material-ui/core'
import { compose, onlyUpdateForKeys } from 'recompose'

const AddItemButton = ({ message, ...props }) => (
  <Button size="small" {...props}>
    <AddCircleOutline color="primary" />
    <InlineTypography color="primary">{message}</InlineTypography>
  </Button>
)

export default compose(onlyUpdateForKeys(['message', 'disabled']))(AddItemButton)
