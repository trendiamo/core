import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Growth from '../images/growth.svg'
import Header from '../components/header'
import PassionHeart from '../images/passion-heart.svg'
import Promotion from '../images/promotion.svg'
import Section from '../components/section'
import Target from '../images/target.svg'

const CardsContainer = styled.div``
const Card = styled.div``
const CardHeader = styled.div``

const WhatYouGet = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Header>
        <span>{'What '}</span>
        <span>{'you '}</span>
        <span>{'get'}</span>
      </Header>
      <CardsContainer>
        <Card>
          <Target />
          <div>
            <CardHeader>{'Matchmaking'}</CardHeader>
            <p>{'We match brands and influencers who share the same values and target audience'}</p>
          </div>
        </Card>
        <Card>
          <PassionHeart />
          <div>
            <CardHeader>{'Content Creation'}</CardHeader>
            <p>{'Inspiring content is created by the influencers to involve their audience'}</p>
          </div>
        </Card>
        <Card>
          <Promotion />
          <div>
            <CardHeader>{'Targeted Distribution'}</CardHeader>
            <p>{'The message is spread to the right target, generating interest in the product'}</p>
          </div>
        </Card>
        <Card>
          <Growth />
          <div>
            <CardHeader>{'Increased Revenue'}</CardHeader>
            <p>{'Sales are generated and the brand pays an according success commission to the influencers'}</p>
          </div>
        </Card>
      </CardsContainer>
    </Container>
  </Section>
))`
  background-color: #272a32;
  color: #fff;
  min-height: 100vh;

  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ${Header} {
    color: #fff;
  }
  ${CardsContainer} {
    display: flex;
    flex-direction: column;
  }
  ${Card} {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  ${CardHeader} {
    font-weight: 800;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
  }
  ${Card} p {
    margin-bottom: 0;
    font-size: 0.75rem;
  }
  ${Card} svg {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    fill: white;
    flex: 1;
  }
  ${Card} svg + div {
    flex: 6;
  }

  @media (min-width: 1000px) {
    ${Container} {
      max-width: 1400px;
    }
    ${CardsContainer} {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    ${Card} {
      width: calc(50% - 0.75rem);
      margin-bottom: 3rem;
    }
    ${Card} svg {
      min-width: 100px;
      min-height: 100px;
      margin-right: 40px;
    }
    ${CardHeader} {
      font-size: calc(10px + 1.7vw);
    }
    ${Card} p {
      font-size: calc(3px + 1.7vw);
    }
  }
`

export default WhatYouGet
