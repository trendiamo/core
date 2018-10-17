import CssBaseline from '@material-ui/core/CssBaseline'
import LockIcon from '@material-ui/icons/LockOutlined'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Main, StyledAvatar, StyledPaper } from './shared'

const AuthLayout = ({ children, title }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <StyledAvatar>
          <LockIcon />
        </StyledAvatar>
        <Typography variant="headline">{title}</Typography>
        {children}
      </StyledPaper>
    </Main>
  </React.Fragment>
)

export default AuthLayout
