import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

import FeaturesHeader from '../images/features-header'

const FeaturesHeaderContainer = styled.div`
  width: 100%;
  max-width: 886px;
`

const FeaturesHero = styled(({ className, featuresHero }) => (
  <Section className={className}>
    <Container>
      <h2>{featuresHero.featuresHeroHeading}</h2>
      <p>{featuresHero.featuresHeroSubHeading.featuresHeroSubHeading}</p>
      <FeaturesHeaderContainer>
        <FeaturesHeader alt="" />
      </FeaturesHeaderContainer>
    </Container>
  </Section>
))`
  padding-top: 0;
  padding-bottom: 0;
  text-align: center;
  @media (min-width: 900px) {
    padding-top: 0;
    padding-bottom: 0;
  }

  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
    padding-bottom: 0;
  }

  h2 {
    width: 100%;
    font-size: 32px;
    line-height: 42px;
  }

  p {
    font-size: 20px;
    line-height: 1.75;
    color: #565656;
    max-width: 945px;
    flex: 1;
  }

  @media (min-width: 900px) {
    h2 {
      font-size: 36px;
    }
  }
`

export default FeaturesHero
