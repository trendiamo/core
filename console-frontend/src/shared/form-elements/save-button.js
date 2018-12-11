import AppBarButton from 'shared/app-bar-button'
import React from 'react'

const Button = ({ message, ...props }) => (
  <AppBarButton color="primary" {...props} type="submit" variant="contained">
    {message || 'Save'}
  </AppBarButton>
)

export default Button
