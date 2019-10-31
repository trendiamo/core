import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import NourIg1Img from '../images/nour-ig1'
import NourIg2Img from '../images/nour-ig2'
import Section from '../components/section'

const Heading = styled.h2``
const PicturesContainer = styled.div``
const PicturesSubContainer = styled.div``
const Pic1 = styled.div``
const Pic2 = styled.div``

const onInstagramClick = () => (window.location.href = 'https://www.instagram.com/nour.livia/')

const ImpactersInstagram = styled(({ className }) => (
  <Section className={className}>
    <PicturesContainer>
      <PicturesSubContainer>
        <Pic1>
          <NourIg2Img />
        </Pic1>
        <Pic2>
          <NourIg1Img />
        </Pic2>
      </PicturesSubContainer>
    </PicturesContainer>
    <Container>
      <Heading>
        {'Nour is an impacter and spreads her positive influence and brands through uptous and her social channels.'}
      </Heading>
      <p>
        {
          'Living a zero waste and plant based lifestyle, slow traveler Nour is on the mission for sustainability and self-love, followed by 20k people.'
        }
      </p>
      <Button color="#272a32" onClick={onInstagramClick} wrap>
        {'Meet her on instagram'}
      </Button>
    </Container>
  </Section>
))`
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
  min-height: 666px;
  display: flex;
  flex-direction: column;

  ${PicturesContainer} {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${PicturesSubContainer} {
    flex: 1;
    max-width: 640px;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }
  ${Pic1} {
    width: 73%;
  }
  ${Pic2} {
    top: 16%;
    left: 0;
    width: 47%;
    position: absolute;
  }
  ${Container} {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  ${Heading} {
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  ${Button} {
    color: #f05d5d;
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
  @media (min-width: 1000px) {
    flex-direction: row;
    min-height: 100vh;
    ${PicturesContainer} {
      flex: 3;
    }
    ${Container} {
      flex: 4;
    }
    ${Heading} {
      font-size: calc(20px + 1vw);
    }
    ${Heading} + p {
      margin-left: 5rem;
    }
    ${Container} {
      min-height: 50vw;
    }
    ${Button} {
      margin-bottom: 6vw;
      min-height: 100px;
      font-size: 35px;
    }
  }
`

export default ImpactersInstagram
