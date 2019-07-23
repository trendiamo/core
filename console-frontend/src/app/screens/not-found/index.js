import React, { useCallback } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { isLocalStorageAccurate } from 'utils'

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

const BoldLink = styled.a`
  text-decoration: none;
  color: #777;
  font-weight: 700;
  cursor: pointer;
`

const StyledButton = styled(Button)`
  color: #616161;
  letter-spacing: 1.3px;
  margin-top: 25px;
  padding: 12px 80px;
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
        <BackgroundImage src="/img/background/not-found.png" />
        <Typography gutterBottom variant="h4">
          {'Oops! This page is not available'}
        </Typography>
        <Typography variant="body2">
          {'Is something wrong? '}
          <BoldLink href="mailto:support@trendiamo.com">{'Get in touch'}</BoldLink>
        </Typography>
        <Typography variant="body2">{'Or come back to home page:'}</Typography>
        <StyledButton onClick={navigateToRootPage} size="large" variant="outlined">
          {'Go Back'}
        </StyledButton>
      </Container>
    </Fullscreen>
  )
}

export default NotFound
