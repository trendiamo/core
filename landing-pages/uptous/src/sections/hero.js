import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import HeroImg from '../images/hero'
import LogoFull from '../images/logo-full.svg'
import Section from '../components/section'
import Wave from '../images/wave.svg'

const HeroImgContainer = styled.div``
const Heading = styled.h1``
const Subheading = styled.h2``
const ButtonsContainer = styled.div``
const AbsContainer = styled.div``
const StyledLogoFull = styled(LogoFull)``
const StyledHeroImg = styled(HeroImg)``
const StyledWave = styled(Wave)``

const Hero = styled(({ className, data }) => (
  <Section className={className}>
    <HeroImgContainer>
      <StyledHeroImg alt="" />
      <StyledWave />
    </HeroImgContainer>
    <AbsContainer>
      <Container>
        <StyledLogoFull />
        <div>
          <Heading>{data.heroHeading}</Heading>
          <Subheading>{data.heroSubheading}</Subheading>
        </div>
        <ButtonsContainer>
          <a href="https://brands.uptous.co">
            <Button>{"I'm a brand"}</Button>
          </a>
          <a href="https://influencers.uptous.co">
            <Button>{"I'm an influencer"}</Button>
          </a>
        </ButtonsContainer>
      </Container>
    </AbsContainer>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  min-height: 700px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${HeroImgContainer} {
    position: relative;
    height: 50vh;
    min-height: 300px;
    overflow: hidden;
  }
  ${StyledHeroImg} {
    height: 100%;
  }
  ${StyledWave} {
    position: absolute;
    bottom: -1px;
  }
  ${AbsContainer} {
    display: flex;
    justify-content: center;
  }
  ${Container} {
    padding: 10px 20px 30px 20px;
    max-width: 800px;
  }
  ${StyledLogoFull} {
    position: absolute;
    top: 25vh;
    left: 50%;
    width: 80%;
    max-width: 320px;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0 0 7px rgba(0, 0, 0, 0.7));
  }
  ${Heading} {
    color: #12e5c4;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.2;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  ${Subheading} {
    font-size: 1.2rem;
    line-height: 1.25;
    margin-bottom: 2rem;
  }
  ${ButtonsContainer} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (min-width: 375px) {
    ${ButtonsContainer} {
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  @media (min-width: 1000px) {
    ${HeroImgContainer} {
      min-height: 650px;
      height: 90vh;
    }
    ${AbsContainer} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    ${Container} {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 10vh;
      padding-bottom: 30vh;
    }
    ${StyledLogoFull} {
      position: static;
      transform: none;
    }
    ${Heading},
    ${Subheading} {
      text-align: center;
      color: #a55652;
    }
    ${Subheading} {
      max-width: 31rem;
    }
    ${ButtonsContainer} {
      padding: 0;
      width: 100%;
      flex-direction: row;
      justify-content: space-evenly;
    }
    ${Button} {
      color: #12e5c4;
      background: #fff;
      width: 310px;
    }
  }
`

export default Hero
