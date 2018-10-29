import CssBaseline from '@material-ui/core/CssBaseline'
import Logotype from 'shared/logotype'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import theme from '../theme'
import Typography from '@material-ui/core/Typography'
import { AuthMain, AuthMessage, AuthStyledPaper, BackgroundImage } from './shared'

const AuthLayout = ({ children, title, authMessage }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <BackgroundImage url="/img/background/login.jpg" />
      <Logotype />
      <AuthMain>
        <AuthStyledPaper elevation={3}>
          <Typography variant="display1">{title}</Typography>
          {children}
        </AuthStyledPaper>
        <AuthMessage>{authMessage}</AuthMessage>
      </AuthMain>
    </MuiThemeProvider>
  </React.Fragment>
)

export default AuthLayout
