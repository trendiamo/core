import frekklsLoginImage from 'assets/img/background/frekkls-login.png'
import React from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { CssBaseline, Typography } from '@material-ui/core'
import { ReactComponent as FrekklsLogo } from 'assets/icons/frekkls-logo.svg'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { showUpToUsBranding } from 'utils'
import { ReactComponent as UpToUsLogo } from 'assets/icons/uptous-logo.svg'

const AuthMain = styled.main`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  @media (min-width: 900px) {
    width: ${showUpToUsBranding() ? '100%' : '50%'};
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
  }
`

const AuthStyledDiv = styled.div`
  position: relative;
  z-index: 100;
  padding: 60px 0;

  margin: auto;
  width: 86%;
  max-width: 380px;
  min-width: 200px;
  flex-shrink: 0;

  @media (min-width: 900px) {
    padding: 60px 24px 60px 0px;
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
    background-image: url(${frekklsLoginImage});
    background-color: #fff;
    background-repeat: no-repeat;
    background-position-y: 80px;
    background-position-x: right;
    background-size: contain;
    min-height: 65vw;
  }
`

const LogotypeContainer = styled.div`
  margin-bottom: 30px;
`

const StyledUpToUsLogo = styled(UpToUsLogo)`
  width: 140px;
`

const StyledFrekklsLogo = styled(FrekklsLogo)`
  width: 140px;
`

const StyledTypography = styled(Typography)`
  ${showUpToUsBranding()
    ? 'font-size: 30px; font-weight: 900; text-transform: uppercase;'
    : 'font-size: 33.4px; font-weight: 300;'}
`

const AuthFormContainer = styled.div`
  background-color: #fff;
  flex: 7;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const UpToUsSideContent = styled.div`
  background-color: #0f7173;
  color: #fff;
  flex: 5;
  text-align: left;
  padding: 20px;

  @media (min-width: 900px) {
    min-height: 100vh;
    padding: 60px;
  }

  h2 {
    margin: 0;
    text-transform: uppercase;
    font-size: 13.34vw;
    font-weight: 900;
    line-height: 0.9;
    @media (min-width: 375px) {
      font-size: 50px;
    }
    @media (min-width: 1000px) {
      font-size: calc(20px + 4vw);
    }
  }

  p {
    font-size: 24px;
    line-height: 1.225;
    @media (min-width: 1000px) {
      font-size: calc(0.8rem + 1.2vw);
    }
  }
`

const Layout = ({ children, SideContent, title }) => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      {!showUpToUsBranding() && <Background />}
      <AuthMain>
        <AuthFormContainer>
          <AuthStyledDiv elevation={3}>
            <LogotypeContainer>{showUpToUsBranding() ? <StyledUpToUsLogo /> : <StyledFrekklsLogo />}</LogotypeContainer>
            {title && <StyledTypography variant="h2">{title}</StyledTypography>}
            {children}
          </AuthStyledDiv>
        </AuthFormContainer>
        {showUpToUsBranding() && (
          <UpToUsSideContent>
            {SideContent ? (
              <SideContent />
            ) : (
              <>
                <h2>{'Start Monetizing Positive Influence'}</h2>
                <p>{'Become an #impacter and earn while promoting the brands that create positive impact.'}</p>
              </>
            )}
          </UpToUsSideContent>
        )}
      </AuthMain>
    </MuiThemeProvider>
  </>
)

export default Layout
