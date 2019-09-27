import FrekklsNotFound from './frekkls'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import UpToUsNotFound from './uptous'
import { isLocalStorageAccurate, showUpToUsBranding } from 'utils'

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
          <UpToUsNotFound navigateToRootPage={navigateToRootPage} />
        ) : (
          <FrekklsNotFound navigateToRootPage={navigateToRootPage} />
        )}
      </Container>
    </Fullscreen>
  )
}

export default NotFound
