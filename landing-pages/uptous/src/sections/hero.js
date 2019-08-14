import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import HeroImg from '../images/hero'
import LogoFullImg from '../images/logo-full'
import Section from '../components/section'
import Wave from '../images/wave.svg'
import { openModal } from '../utils'

const HeroImgContainer = styled.div``
const Heading = styled.h1``
const Subheading = styled.h2``
const ButtonsContainer = styled.div``
const AbsContainer = styled.div``
const LogoFullContainer = styled.div``
const StyledHeroImg = styled(HeroImg)``
const StyledWave = styled(Wave)``

const onBrandClick = () => {
  if (!window.hbspt) return
  openModal('.brand-modal-content')
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: 'eab5b809-6c1f-49fc-bed2-62fbd90f0937',
    target: '.brand-modal-form',
  })
}
const onInfluencerClick = () => {
  if (!window.hbspt) return
  openModal('.influencer-modal-content')
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: 'e58322b5-96ba-4f25-a50e-54b1ca355dd2',
    target: '.influencer-modal-form',
  })
}

const Hero = styled(({ className, data }) => (
  <Section className={className}>
    <HeroImgContainer>
      <StyledHeroImg alt="" />
      <StyledWave />
    </HeroImgContainer>
    <AbsContainer>
      <Container>
        <LogoFullContainer>
          <LogoFullImg />
        </LogoFullContainer>
        <div>
          <Heading>{data.heroHeading}</Heading>
          <Subheading>{data.heroSubheading}</Subheading>
        </div>
        <ButtonsContainer>
          <Button onClick={onBrandClick}>{"I'm a brand"}</Button>
          <Button onClick={onInfluencerClick}>{"I'm an influencer"}</Button>
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
    transform: translateZ(-600px) scale(2.2);
    transform-origin: bottom;
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
  ${LogoFullContainer} {
    position: absolute;
    top: calc(25vh - 40px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 320px;
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

  @media (min-width: 500px) {
    ${StyledHeroImg} {
      transform: translateZ(-600px) scale(2);
    }
  }

  @media (min-width: 1000px) {
    ${StyledHeroImg} {
      transform: translateZ(-600px) scale(2.1);
      transform-origin: center 70%;
    }
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
    ${LogoFullContainer} {
      position: static;
      transform: none;
    }
    ${Heading},
    ${Subheading} {
      text-align: center;
      color: #1a3b50;
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
