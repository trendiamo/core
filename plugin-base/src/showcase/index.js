import Cover, { BelowCover } from 'shared/cover'
import React from 'react'
import styled from 'styled-components'
import { Router, transition } from 'ext'
import { ShowcaseContent, ShowcaseCover, SpotlightContent, SpotlightCover } from './components'

const GhostLayer = styled.div`
  visibility: ${({ isTransitioning }) => (isTransitioning ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Showcase = ({
  history,
  onRouteChange,
  routeToShowcase,
  routeToSpotlight,
  isTransitioning,
  spotlights,
  subtitle,
  title,
  callbacks,
}) => (
  <ColFlexDiv>
    <Cover>
      <Router history={history} onChange={onRouteChange}>
        <ShowcaseCover path="/showcase/:id" subtitle={subtitle} title={title} />
        <SpotlightCover path="/showcase/:id/spotlight/:id" routeToShowcase={routeToShowcase} spotlights={spotlights} />
      </Router>
    </Cover>
    <BelowCover>
      <Router history={history} onChange={onRouteChange}>
        <ShowcaseContent
          callbacks={callbacks}
          path="/showcase/:id"
          routeToSpotlight={routeToSpotlight}
          spotlights={spotlights}
        />
        <SpotlightContent callbacks={callbacks} path="/showcase/:id/spotlight/:id" spotlights={spotlights} />
      </Router>
    </BelowCover>
    <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
  </ColFlexDiv>
)

export default Showcase
