import React from 'react'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import { List } from 'shared/list'
import { TopSlideAnimation } from 'shared'

const Container = styled.div`
  flex: 1;
  padding: 1rem;
`

const ShowcaseContent = ({ isLeaving, callbacks, spotlights }) => (
  <Container>
    <TopSlideAnimation delay={250 * 1} isLeaving={isLeaving}>
      <List>
        {spotlights.map((spotlight, index) =>
          spotlight.Component ? (
            spotlight.Component
          ) : (
            <SpotlightItem
              key={spotlight.id || `new-${index}`}
              onClick={callbacks.onSpotlightClick}
              spotlight={spotlight}
            />
          )
        )}
      </List>
    </TopSlideAnimation>
  </Container>
)

export default ShowcaseContent
