import React from 'react'
import { Tooltip as TooltipMui } from '@material-ui/core'

const Tooltip = ({ children, disabled, ...props }) => (
  <TooltipMui
    disableFocusListener={disabled}
    disableHoverListener={disabled}
    disableTouchListener={disabled}
    {...props}
  >
    {children}
  </TooltipMui>
)

export default Tooltip
