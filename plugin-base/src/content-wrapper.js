import React, { useCallback, useEffect, useState } from 'react'
import routes from './routes'
import styled from 'styled-components'
import { timeout, transition } from 'ext'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #333;
`

const ContentWrapper = ({ children, onUserInteracted, ...props }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [interacted, setInteracted] = useState(false)

  useEffect(() => {
    return () => {
      timeout.clear('contentWrapper')
      transition.clear()
    }
  }, [])

  const onRouteChange = useCallback((previousRoute, route) => {
    const exitDuration = 300
    if (routes.isShowcase(previousRoute) && routes.isSpotlight(route)) {
      setIsTransitioning(true)
      transition.liftElements()
      timeout.set(
        'contentWrapper',
        () => {
          setIsTransitioning(false)
          timeout.clear('contentWrapper')
          transition.clear()
        },
        exitDuration + transition.duration
      )
    }
    return exitDuration
  }, [])

  const handleFirstInteraction = useCallback(
    event => {
      if (interacted || event.which === 3) return
      onUserInteracted && onUserInteracted()
      setInteracted(true)
    },
    [onUserInteracted, interacted]
  )

  return (
    <Wrapper onMouseDown={handleFirstInteraction} onTouchStart={handleFirstInteraction}>
      {React.cloneElement(children, { ...props, isTransitioning, onRouteChange })}
    </Wrapper>
  )
}

export default ContentWrapper
