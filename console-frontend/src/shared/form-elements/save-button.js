import MuiButton from '@material-ui/core/Button'
import React from 'react'

const Button = ({ message, ...props }) => (
  <MuiButton {...props} color="primary" type="submit" variant="contained">
    {message || 'Save'}
  </MuiButton>
)

export default Button
