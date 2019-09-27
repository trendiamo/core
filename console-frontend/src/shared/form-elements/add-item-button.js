import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import InlineTypography from './inline-typography'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const StyledInlineTypography = styled(InlineTypography)`
  line-height: 1;
`

const AddItemButton = ({ message, ...props }) => (
  <Button size="small" {...props}>
    <AddCircleOutline color="primary" />
    <StyledInlineTypography color="primary">{message}</StyledInlineTypography>
  </Button>
)

export default AddItemButton
