import React from 'react'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import { List } from 'shared/list'
import { TopSlideAnimation } from 'shared/animate'

const Container = styled.div`
  flex: 1;
  padding: 1rem;
`

const ShowcaseContent = ({ isLeaving, routeToSpotlight, spotlights, callbacks }) => (
  <Container>
    <TopSlideAnimation delay={250 * 1} isLeaving={isLeaving}>
      <List>
        {spotlights.map(
          (spotlight, index) =>
            !spotlight._destroy && (
              <SpotlightItem
                key={spotlight.id || index}
                onClick={callbacks.onSpotlightClick({ spotlight })}
                routeToSpotlight={routeToSpotlight}
                spotlight={spotlight}
              />
            )
        )}
      </List>
    </TopSlideAnimation>
  </Container>
)

export default ShowcaseContent
