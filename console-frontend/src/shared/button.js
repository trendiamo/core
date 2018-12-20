import React from 'react'
import theme from 'app/theme'
import { Button as MuiButton } from '@material-ui/core'

// Customized button (since Mui accepts a very small range of params in the original Button component)
const Button = ({ color, ...props }) => <MuiButton style={theme.customButtons[color]} {...props} />

export default Button
