import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import InlineTypography from './inline-typography'
import React from 'react'
import { Button } from '@material-ui/core'

const AddItemButton = ({ message, ...props }) => (
  <Button size="small" {...props}>
    <AddCircleOutline color="primary" />
    <InlineTypography color="primary">{message}</InlineTypography>
  </Button>
)

export default AddItemButton
