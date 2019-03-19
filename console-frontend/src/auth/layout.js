import React from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CssBaseline, Typography } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'

const AuthMain = styled.main`
  display: block;
  padding: 0 20px;
  margin: 20px auto 120px;
  width: 100%;

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

const AuthStyledDiv = styled.div`
  text-align: center;
  position: relative;
  z-index: 100;
  padding: 0px 30px;

  margin: auto;
  width: auto;
  max-width: 380px;
  min-width: 200px;
  flex-shrink: 0;

  @media (min-width: 900px) {
    padding: 48px 24px 32px 0px;
    text-align: left;
    display: block;
    width: 380px;
    margin: 0;
  }
`

const BackgroundImage = styled.div`
  background-image: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;

  @media (min-width: 900px) {
    height: 130vh;
    bottom: 0;
    top: auto;
    background-image: url('${props => props.url}');
    background-color: #fff;
    background-repeat: no-repeat;
    background-position-y: 80px;
    background-position-x: 340px;
    background-size: contain;
    min-height: 65vw;
  }

  @media (min-width: 1200px) {
    background-position-x: right;
  }
`

const LogotypeContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;

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
    <img alt="" src="/img/frekkls-logo.svg" {...props} />
  </LogotypeContainer>
)

const StyledTypography = styled(Typography)`
  font-size: 33.4px;
  font-weight: 300;
`

const Layout = ({ children, title }) => (
  <React.Fragment>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <BackgroundImage url="/img/background/login.png" />
      <Logotype />
      <AuthMain>
        <AuthStyledDiv elevation={3}>
          <StyledTypography variant="h2">{title}</StyledTypography>
          {children}
        </AuthStyledDiv>
      </AuthMain>
    </MuiThemeProvider>
  </React.Fragment>
)

export default Layout
