import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'

const WhatWeDo = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Header>
        <span>{'What '}</span>
        <b>{'we'}</b>
        <span>{' do'}</span>
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
    </Container>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  ${Container} {
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  @media (min-width: 1000px) {
    align-items: center;
    text-align: center;
    ${Container} {
      padding-top: 100px;
      padding-bottom: 100px;
      font-size: 1.5rem;
    }
    ${Header} {
      justify-content: center;
    }
  }
`

export default WhatWeDo
