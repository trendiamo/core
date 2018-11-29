import React from 'react'
import theme from 'app/theme'
import Typography from '@material-ui/core/Typography'

const styles = {
  error: {
    color: theme.palette.error.main,
  },
  success: {
    color: theme.customPalette.success.main,
  },
}

const Notification = ({ data, ...props }) => {
  const status = data ? data.status : null
  const message = data ? data.message : null
  return (
    <Typography align="center" style={styles[status]} variant="caption" {...props}>
      {message}
    </Typography>
  )
}

export default Notification
