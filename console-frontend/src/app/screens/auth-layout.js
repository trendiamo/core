import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import theme from '../theme'
import Typography from '@material-ui/core/Typography'
import { Main, StyledPaper } from './shared'

const AuthLayout = ({ children, title }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Main>
        <StyledPaper>
          <Typography variant="headline">{title}</Typography>
          {children}
        </StyledPaper>
      </Main>
    </MuiThemeProvider>
  </React.Fragment>
)

export default AuthLayout
