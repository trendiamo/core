import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Header from '../components/header'
import LogoCanussa from '../images/logo-canussa'
import LogoElementum from '../images/logo-elementum'
import LogoNave from '../images/logo-nave'
import LogoOceanBottle from '../images/logo-ocean-bottle'
import LogoVintageForACause from '../images/logo-vintage-for-a-cause'
import LogoWaterhaul from '../images/logo-waterhaul'
import Section from '../components/section'

const Images = styled.div``

const PledgeSocialProof = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Header>{'Trusted By'}</Header>
      <Images>
        <LogoOceanBottle />
        <LogoVintageForACause />
        <LogoNave />
        <LogoWaterhaul />
        <LogoCanussa />
        <LogoElementum />
      </Images>
    </Container>
  </Section>
))`
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ${Header} {
    font-size: 30px;
  }
  @media (min-width: 1000px) {
    ${Header} {
      font-size: calc(20px + 1vw);
    }
  }

  ${Images} {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;

    > * {
      min-width: 110px;
      height: 140px;
      margin: 10px;
    }
  }

  @media (min-width: 1000px) {
    ${Images} > * {
      min-width: 140px;
    }
  }
`

export default PledgeSocialProof
