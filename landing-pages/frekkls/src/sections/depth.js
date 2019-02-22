import React from 'react'
import styled from 'styled-components'

import BgWaveGrey from '../images/bg-wave-grey.svg'
import Card01 from '../images/card-01'
import Card02 from '../images/card-02'
import Card03 from '../images/card-03'
import Cards, { Card } from '../components/cards'
import Container from '../components/container'
import Section from '../components/section'

const DepthCards = ({ depth }) => (
  <Cards>
    <Card>
      <Card01 alt="" />
      <h3>{depth.feature1Heading}</h3>
      <p>{depth.feature1Text}</p>
    </Card>
    <Card>
      <Card02 alt="" />
      <h3>{depth.feature2Heading}</h3>
      <p>{depth.feature2Text}</p>
    </Card>
    <Card>
      <Card03 alt="" />
      <h3>{depth.feature3Heading}</h3>
      <p>{depth.feature3Text}</p>
    </Card>
  </Cards>
)

const Depth = styled(({ className, depth }) => (
  <Section className={className}>
    <Container>
      <DepthCards depth={depth} />
    </Container>
  </Section>
))`
  background-image: url('${BgWaveGrey}');
  background-repeat: no-repeat;
`

export default Depth
