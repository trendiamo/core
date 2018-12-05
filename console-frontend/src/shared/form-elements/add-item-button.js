import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import InlineTypography from './inline-typography'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const CircleIcon = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddItemButton = ({ message, ...props }) => (
  <Button size="small" {...props}>
    <CircleIcon />
    <InlineTypography>{message}</InlineTypography>
  </Button>
)

export default AddItemButton
