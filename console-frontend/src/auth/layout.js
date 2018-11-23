import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider } from '@material-ui/core/styles'

const AuthMessage = styled.div`
  flex: 2;
  flex-basis: 500px;
  z-index: 100;
  flex-grow: 0;
  position: relative;

  text-align: center;
  padding: 20px;

  @media (min-width: 900px) {
    padding: 112px 0px 0px 100px;
    text-align: right;
  }

  @media (min-width: 1050px) {
    padding-left: 45px;
  }
`

const AuthMain = styled.main`
  display: block;
  padding: 0 20px;
  margin: 20px auto 120px;

  @media (min-width: 900px) {
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    max-width: 1200px;
  }

  @media (min-width: 1050px) {
    padding: 0 85px;
  }
`

const AuthStyledPaper = styled(Paper)`
  display: block;
  text-align: center;
  position: relative;
  padding: 48px 24px 32px;
  z-index: 100;

  margin: auto;
  width: auto;
  max-width: 380px;
  min-width: 200px;
  flex-shrink: 0;

  @media (min-width: 900px) {
    width: 380px;
    margin: 0;
  }
`

const BackgroundImage = styled.div`
  background-image: linear-gradient(to bottom, #000000, #344359);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;

  @media (min-width: 900px) {
    height: 130vh;
    bottom: 0;
    top: auto;
    background-image: url('${props => props.url}');
    background-color: #f2f4f7;
    background-repeat: no-repeat;
    background-position-x: right;
    background-position-y: bottom;
    background-size: contain;
    min-height: 65vw;
  }
`

const LogotypeContainer = styled.div`
  display: none;
  position: relative;

  @media (min-width: 900px) {
    display: block;
    margin: 60px auto 60px;
    padding: 0 40px;
    max-width: 1200px;
  }

  @media (min-width: 1050px) {
    padding: 0 85px;
  }
`

const Logotype = ({ ...props }) => (
  <LogotypeContainer>
    <img alt="" src="/img/trendiamo-logo.svg" {...props} />
  </LogotypeContainer>
)

const Layout = ({ children, title, authMessage }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <BackgroundImage url="/img/background/login.jpg" />
      <Logotype />
      <AuthMain>
        <AuthStyledPaper elevation={3}>
          <Typography variant="h4">{title}</Typography>
          {children}
        </AuthStyledPaper>
        <AuthMessage>{authMessage}</AuthMessage>
      </AuthMain>
    </MuiThemeProvider>
  </React.Fragment>
)

export default Layout
