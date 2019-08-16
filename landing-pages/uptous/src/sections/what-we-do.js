import React from 'react'
import styled from 'styled-components'

import BeachImg from '../images/beach'
import Button from '../components/button'
import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'
import { openModal } from '../utils'

const AbsContainer = styled.div``
const BeachImgContainer = styled.div``
const StyledBeachImg = styled(BeachImg)``

const onGetInTouchClick = () => {
  if (!window.hbspt) return
  openModal('.get-in-touch-modal-content')
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: 'd2106863-b4fd-4591-a806-7411e7798762',
    target: '.get-in-touch-modal-form',
  })
}

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
            'We empower brands to reach their target audience through social media individuals and passionate consumers that want to spread the message for a better world.'
          }
        </p>
        <p>
          {
            'We work on a performance-basis to guarantee a return on investment for the brands and fair compensation for the influencers, that can monetize their positive impact.'
          }
        </p>
        <Button onClick={onGetInTouchClick}>{'Get in touch'}</Button>
      </Container>
    </AbsContainer>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${BeachImgContainer} {
    flex: 1;
  }
  ${StyledBeachImg} {
    height: 100%;
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
    display: flex;
    flex-direction: column;
  }
  ${Button} {
    margin-top: 40px;
    max-width: 280px;
    align-self: center;
  }
  a {
    display: block;
    margin-top: 50px;
  }
  @media (min-width: 375px) {
    height: 450px;
  }
  @media (min-width: 600px) {
    height: 380px;
  }
  @media (min-width: 1000px) {
    height: 530px;
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
