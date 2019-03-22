import React from 'react'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import { List } from 'shared/list'
import { TopSlideAnimation } from 'shared/animate'

const Container = styled.div`
  flex: 1;
  padding: 1rem;
`

const ShowcaseContent = ({ isLeaving, spotlights, callbacks }) => (
  <Container>
    <TopSlideAnimation delay={250 * 1} isLeaving={isLeaving}>
      <List>
        {spotlights.map((spotlight, index) => (
          <SpotlightItem
            index={index}
            key={spotlight.id || `new-${index}`}
            onClick={callbacks.onSpotlightClick({ spotlight })}
            spotlight={spotlight}
          />
        ))}
      </List>
    </TopSlideAnimation>
  </Container>
)

export default ShowcaseContent
