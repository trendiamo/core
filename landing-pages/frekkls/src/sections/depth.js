import React from 'react'
import styled from 'styled-components'

import Cards, { Card } from '../components/cards'
import Container, { SmallContainer } from '../components/container'
import Pill from '../components/pill'
import Section from '../components/section'
import { NoOutlineButton } from '../components/button'

const DepthCards = ({ depth }) => (
  <Cards>
    <Card>
      <div>
        <Pill>{depth.feature1Pill}</Pill>
      </div>
      <h3>{depth.feature1Heading}</h3>
      <p>{depth.feature1Text}</p>
      <div>
        <NoOutlineButton className="js-request-demo">{depth.feature1Cta}</NoOutlineButton>
      </div>
    </Card>
    <Card>
      <div>
        <Pill>{depth.feature2Pill}</Pill>
      </div>
      <h3>{depth.feature2Heading}</h3>
      <p>{depth.feature2Text}</p>
      <div>
        <NoOutlineButton className="js-request-demo">{depth.feature2Cta}</NoOutlineButton>
      </div>
    </Card>
    <Card>
      <div>
        <Pill>{depth.feature3Pill}</Pill>
      </div>
      <h3>{depth.feature3Heading}</h3>
      <p>{depth.feature3Text}</p>
      <div>
        <NoOutlineButton className="js-request-demo">{depth.feature3Cta}</NoOutlineButton>
      </div>
    </Card>
  </Cards>
)

const Depth = styled(({ className, depth }) => (
  <Section className={className}>
    <Container>
      <SmallContainer>
        <h3>{depth.featuresHeading}</h3>
        <p>{depth.featuresSubText}</p>
      </SmallContainer>
      <DepthCards depth={depth} />
    </Container>
  </Section>
))`
  background-color: #fbfcfd;

  @media (min-width: 900px) {
    background-color: transparent;
    z-index: 1;
  }
`

export default Depth
