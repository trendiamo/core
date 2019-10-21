import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const Heading = styled.h1``
const Subheading = styled.div``

const PledgeHero = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Heading>{'Changing how we consume for the better, forever.'}</Heading>
      <Subheading>
        {'We pledge ourselves to creating business that is positive for everyone - including our planet.'}
      </Subheading>
    </Container>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  min-height: 666px;
  background-color: #ef605e;
  display: flex;

  ${Container} {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  ${Heading} {
    color: #fff;
    font-weight: 900;
    font-size: 13.34vw;
    line-height: 0.9;
    text-transform: uppercase;
  }
  ${Subheading} {
    margin-top: 3rem;
    line-height: 1.225;
    color: #fff;
  }

  @media (min-width: 375px) {
    ${Heading} {
      font-size: 50px;
    }
  }

  @media (min-width: 1000px) {
    min-height: 100vh;
    ${Container} {
      min-height: 50vw;
    }
    ${Heading} {
      text-shadow: none;
      font-size: calc(20px + 4vw);
    }
    ${Subheading} {
      margin-left: 16rem;
      font-size: calc(0.8rem + 1.2vw);
    }
  }
`

export default PledgeHero
