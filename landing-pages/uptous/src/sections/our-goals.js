import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'
import ValuesImg from '../images/values'

const StyledValuesImg = styled(ValuesImg)``

const OurGoals = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Header>
        {'What we are '}
        <b>{'achieving together'}</b>
      </Header>
      <p>
        {'We believe that the '}
        <b>{"United Nation's goals for sustainable development"}</b>
        {' are fully achievable by 2030 if we team-up and work together towards them!'}
      </p>
      <p>
        <b>{'This is what we are working for:'}</b>
      </p>
      <StyledValuesImg />
    </Container>
  </Section>
))`
  ${Container} {
    display: flex;
    flex-direction: column;
  }

  ${StyledValuesImg} {
    max-width: 852px;
  }
`

export default OurGoals
