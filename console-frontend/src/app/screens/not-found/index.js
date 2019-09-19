import React, { useCallback } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { isLocalStorageAccurate, showUpToUsBranding } from 'utils'
import { ReactComponent as MagnifierIcon } from 'assets/icons/magnifier.svg'

const Fullscreen = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

const Container = styled.div`
  position:relative
  text-align: center;
  max-width: 60%;
  flex: none;
  margin: auto;
  padding: 50px 0;
`

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`

const StyledTypography = styled(Typography)`
  color: #8799a4;
  font-size: 20px;
  line-height: 1.2;

  a {
    color: ${showUpToUsBranding() ? '#0f7173' : '#ff6641'};
  }
`

const StyledButton = styled(Button)`
  ${showUpToUsBranding() && 'border-radius: 0;'}
`

const NotFound = () => {
  const navigateToRootPage = useCallback(event => {
    event.preventDefault()
    window.location.href = routes.root()
  }, [])

  if (!isLocalStorageAccurate()) return null

  return (
    <Fullscreen>
      <Container>
        {showUpToUsBranding() ? (
          <MagnifierIcon height="86" width="86" />
        ) : (
          <BackgroundImage src="/img/background/not-found.png" />
        )}
        <br />
        <br />
        <StyledTypography variant="body2">{"Oops, we couldn't find a page with that link!"}</StyledTypography>
        <StyledTypography gutterBottom variant="body2">
          {'You can report a problem if you suspect a bug, '}
          <a href="mailto:support@trendiamo.com">{'here'}</a>
          {'.'}
        </StyledTypography>
        <br />
        <StyledButton
          color="primary"
          onClick={navigateToRootPage}
          size="large"
          variant={showUpToUsBranding() ? 'contained' : 'outlined'}
        >
          {'Return Home'}
        </StyledButton>
      </Container>
    </Fullscreen>
  )
}

export default NotFound
