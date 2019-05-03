import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import InlineTypography from './inline-typography'
import React, { memo } from 'react'
import { Button } from '@material-ui/core'

const AddItemButton = ({ message, ...props }) => (
  <Button size="small" {...props}>
    <AddCircleOutline color="primary" />
    <InlineTypography color="primary">{message}</InlineTypography>
  </Button>
)

export default memo(
  AddItemButton,
  (prevProps, nextProps) => prevProps.message === nextProps.message && prevProps.disabled === nextProps.disabled
)
