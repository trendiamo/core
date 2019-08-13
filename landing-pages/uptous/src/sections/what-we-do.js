import React from 'react'
import styled from 'styled-components'

import BeachImg from '../images/beach'
import Button from '../components/button'
import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'

const AbsContainer = styled.div``
const BeachImgContainer = styled.div``
const StyledBeachImg = styled(BeachImg)``

const WhatWeDo = styled(({ className }) => (
  <Section className={className}>
    <BeachImgContainer>
      <StyledBeachImg alt="" />
    </BeachImgContainer>
    <AbsContainer>
      <Container>
        <Header>
          {'What '}
          <b>{'we'}</b>
          {' do'}
        </Header>
        <p>
          {
            'We empower brands to reach their target audience through influencers and passionate consumers that want to spread a message for a better world.'
          }
        </p>
        <p>
          {
            'We work on a performance-based to guarantee a return on investment for the brands and fair compensation for the influencers, that can monetize their positive impact.'
          }
        </p>
        <a href="mailto:hello@uptous.co">
          <Button>{'Get in touch'}</Button>
        </a>
      </Container>
    </AbsContainer>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${BeachImgContainer} {
    flex: 1;
  }
  ${StyledBeachImg} {
    height: 100%;
    transform: translateZ(-300px) scale(1.9);
  }
  ${AbsContainer} {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
  ${Container} {
    padding: 30px 20px;
  }
  a {
    display: block;
    margin-top: 50px;
  }
  @media (min-width: 375px) {
    height: 430px;
  }
  @media (min-width: 600px) {
    height: 360px;
  }
  @media (min-width: 1000px) {
    height: 500px;
    ${StyledBeachImg} {
      transform: translateZ(-600px) scale(1.9);
    }
    ${Container} {
      padding-top: 100px;
      padding-bottom: 100px;
    }
    a {
      margin-left: auto;
      margin-right: auto;
      width: 300px;
    }
  }
`

export default WhatWeDo
