import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const Heading = styled.h1``
const Subheading = styled.div``

const onBecomeImpacterClick = () => (window.location.href = 'https://app.uptous.co/')

const ImpactersHero = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Heading>{'Join the global movement and become a positive impacter.'}</Heading>
      <Subheading>
        {
          'We are building the first positive impact sales force in the world. Become an #IMPACTER and earn while promoting the brands that create positive impact for a sustainable world.'
        }
      </Subheading>
      <Button onClick={onBecomeImpacterClick}>{'Become an impacter'}</Button>
    </Container>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  background-color: #ef605e;
  display: flex;
  height: 680px;
  min-height: 100vh;

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
    font-size: calc(30px + 1vw);
    line-height: 0.9;
    text-transform: uppercase;
  }
  ${Subheading} {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.225;
    color: #fff;
  }
  ${Button} {
    margin-bottom: 1rem;
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
      border-color: transparent transparent transparent #fff;
    }
  }

  @media (min-width: 1000px) {
    ${Heading} {
      font-size: 50px;
    }
    ${Subheading} {
      margin-top: 2rem;
      margin-bottom: 2rem;
      margin-left: 10rem;
      font-size: calc(0.8rem + 0.8vw);
    }
    ${Button} {
      margin-left: -17vw;
      font-size: 35px;
    }
  }
`

export default ImpactersHero
