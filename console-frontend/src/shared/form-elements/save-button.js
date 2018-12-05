import MuiButton from '@material-ui/core/Button'
import React from 'react'
import SaveIcon from '@material-ui/icons/Save'

const defaultMessage = 'Save'

const Button = ({ message, ...props }) => (
  <MuiButton {...props} color="primary" type="submit" variant="contained">
    <SaveIcon />
    {message ? 'Save' : defaultMessage}
  </MuiButton>
)

export default Button
