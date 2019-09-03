import React, { useRef } from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import HeroImg from '../images/hero'
import Section from '../components/section'
import { openModal } from '../utils'
import { useParallax } from '../hooks'

const onGetStartedClick = () => {
  if (!window.hbspt) return
  openModal('.get-started-modal-content')
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: 'd2106863-b4fd-4591-a806-7411e7798762',
    target: '.get-started-modal-form',
  })
}

const Heading = styled.h1``
const Subheading = styled.div``
const StyledHeroImg = styled(HeroImg)``

const Hero = styled(({ className, data }) => {
  const ref = useRef(null)
  useParallax({ ref })

  return (
    <Section className={className}>
      <StyledHeroImg alt="" ref={ref} />
      <Container>
        <div>
          <Heading>{data.heroHeading}</Heading>
          <Subheading>{data.heroSubheading}</Subheading>
        </div>
        <Button onClick={onGetStartedClick}>{'Get Started'}</Button>
      </Container>
    </Section>
  )
})`
  padding: 0;
  position: relative;
  overflow: hidden;
  min-height: 666px;
  background-color: #107173;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${StyledHeroImg} {
    flex: 2;
    transform-origin: bottom;
    max-height: 70vh;
  }
  ${Container} {
    flex: 1;
    padding: 90px 20px 30px 20px;
    max-width: 800px;
    position: relative;
  }
  ${Heading} {
    color: #fff;
    font-weight: 900;
    font-size: 13.34vw;
    line-height: 0.9;
    text-transform: uppercase;
    position: absolute;
    top: -1.4em;
    text-shadow: 0 0 20px #000;
    max-width: 420px;
  }
  ${Subheading} {
    line-height: 1.225;
    margin-bottom: 1.8rem;
    color: #fff;
  }
  ${Button} {
    span {
      padding-left: 12px;
      padding-right: 12px;
    }
    &:before {
      content: '';

      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 19px 0 19px 32.9px;
      border-color: transparent transparent transparent #f05d5d;
    }
  }

  @media (min-width: 375px) {
    ${Heading} {
      font-size: 50px;
    }
  }

  @media (min-width: 1000px) {
    min-height: 100vh;
    flex-direction: row;
    ${StyledHeroImg} {
      flex: 15;
      max-height: unset;
    }
    ${Container} {
      flex: 7;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 90px;
      padding-top: 160px;
    }
    ${Heading} {
      text-shadow: none;
      top: unset;
      left: -1.88em;
      font-size: calc(20px + 4vw);
      max-width: 600px;
    }
    ${Subheading} {
      margin-top: calc(1em + 16vw);
      font-size: calc(0.8rem + 1.2vw);
    }
    ${Button} {
      margin-left: -17vw;
      margin-bottom: 6vw;
      min-height: 100px;
      font-size: calc(8px + 2.5vw);
      span {
        line-height: 100px;
      }
      &:before {
        border-width: 50px 0 50px 77px;
      }
    }
  }
`

export default Hero
