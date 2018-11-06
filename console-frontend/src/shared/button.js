import MuiButton from '@material-ui/core/Button'
import React from 'react'
import theme from 'app/theme'

// Customized button (since MUI accepts a very small range of params in the original Button component)
const Button = ({ color, ...props }) => <MuiButton style={theme.customButtons[color]} {...props} />

export default Button
