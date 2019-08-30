import React from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CssBaseline, Typography } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { showUpToUsBranding } from 'utils'

const AuthMain = styled.main`
  display: block;
  padding: 0 20px;
  margin: 0 auto 120px;
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
    padding: 0 24px 32px 0px;
    text-align: left;
    display: block;
    width: 380px;
    margin: 0;
  }
`

const Background = styled.div`
  background-image: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;

  @media (min-width: 900px) {
    height: 130vh;
    bottom: 0;
    top: auto;
    background-image: url('/img/background/frekkls-login.png');
    background-color: #fff;
    background-repeat: no-repeat;
    background-position-y: 80px;
    background-position-x: right;
    background-size: contain;
    min-height: 65vw;
  }
`

const UpToUsBackgroundContainer = styled(Background)`
  display: flex;
  user-select: none;

  @media (min-width: 900px) {
    background-image: url('/img/background/uptous-login.png');
    background-position-x: 66%;
    background-size: cover;
  }
`

const WaveContainer = styled.div`
  background: white;
  border-right: 1px solid white;
  position: relative;
  visibility: hidden;
  width: 40%;

  @media (min-width: 900px) {
    visibility: visible;
  }
`

const WaveImage = styled.img`
  height: 101%;
  left: 100%;
  position: absolute;
  -webkit-user-drag: none;
`

const UpToUsBackground = () => (
  <UpToUsBackgroundContainer>
    <WaveContainer>
      <WaveImage alt="" src="/img/background/wave-login.svg" />
    </WaveContainer>
  </UpToUsBackgroundContainer>
)

const LogotypeContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0;

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

const LogoImage = styled.img`
  max-width: 140px;
`

const Logotype = props => (
  <LogotypeContainer>
    <LogoImage alt="" src={showUpToUsBranding() ? '/img/uptous-logo.svg' : '/img/frekkls-logo.svg'} {...props} />
  </LogotypeContainer>
)

const StyledTypography = styled(Typography)`
  font-size: 33.4px;
  font-weight: 300;
`

const Layout = ({ children, title }) => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      {showUpToUsBranding() ? <UpToUsBackground /> : <Background />}
      <Logotype />
      <AuthMain>
        <AuthStyledDiv elevation={3}>
          <StyledTypography variant="h2">{title}</StyledTypography>
          {children}
        </AuthStyledDiv>
      </AuthMain>
    </MuiThemeProvider>
  </>
)

export default Layout
