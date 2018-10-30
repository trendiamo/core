import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import theme from 'app/theme'
import Typography from '@material-ui/core/Typography'
import { AuthMain, AuthStyledPaper } from './shared'

const AuthLayout = ({ children, title }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <AuthMain>
        <AuthStyledPaper>
          <Typography variant="headline">{title}</Typography>
          {children}
        </AuthStyledPaper>
      </AuthMain>
    </MuiThemeProvider>
  </React.Fragment>
)

export default AuthLayout
