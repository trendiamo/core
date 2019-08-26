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
        <b>{'What'}</b>
        {' you get'}
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
  background-color: #00334a;

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
    border: 4px solid #12e5c4;
    border-radius: 10px;
    box-shadow: 0 0 30px rgba(18, 230, 196, 0.5);
    background-color: #fff;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }
  ${CardHeader} {
    font-weight: bold;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
    color: #001b3e;
  }
  ${Card} p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
  ${Card} svg {
    width: 80px;
    height: 80px;
    margin-right: 1rem;
  }

  @media (min-width: 1000px) {
    padding-top: 10px;
    background-color: #fff;
    ${Header} {
      color: #00334b;
    }
    ${CardsContainer} {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    ${Card} {
      width: calc(50% - 0.75rem);
    }
    ${Card} p {
      font-size: 0.8rem;
    }
  }
`

export default WhatYouGet
