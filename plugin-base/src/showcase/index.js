import Cover from 'shared/cover'
import React from 'react'
import styled from 'styled-components'
import { BelowCover } from 'shared/cover/components'
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
  backButtonLabel,
  FlowBackButton,
  history,
  onRouteChange,
  routeToShowcase,
  isTransitioning,
  spotlights,
  subtitle,
  title,
  callbacks,
  assessmentSpotlight,
}) => (
  <ColFlexDiv>
    <Cover>
      <Router history={history} onChange={onRouteChange}>
        <ShowcaseCover FlowBackButton={FlowBackButton} path="/showcase/:id" subtitle={subtitle} title={title} />
        <SpotlightCover
          backButtonLabel={backButtonLabel}
          path="/showcase/:showcaseId/spotlight/:spotlightId"
          routeToShowcase={routeToShowcase}
          spotlights={spotlights}
        />
      </Router>
    </Cover>
    <BelowCover>
      <Router history={history} onChange={onRouteChange}>
        <ShowcaseContent
          assessmentSpotlight={assessmentSpotlight}
          callbacks={callbacks}
          path="/showcase/:id"
          spotlights={spotlights}
        />
        <SpotlightContent
          callbacks={callbacks}
          path="/showcase/:showcaseId/spotlight/:spotlightId"
          spotlights={spotlights}
        />
      </Router>
    </BelowCover>
    <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
  </ColFlexDiv>
)

export default Showcase
