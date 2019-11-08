import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const onGetStartedClick = () => navigate('/signup')

const PledgeCta = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <p>
        {
          "Join our platform and movement to empower a new world in which creating sustainable business is not only the right business to run, but the best way, from all perspectives - it's up to us!"
        }
      </p>
      <Button color="#272a32" onClick={onGetStartedClick}>
        {'Get Started Today'}
      </Button>
    </Container>
  </Section>
))`
  background-color: #e7ecef;
  min-height: 100vh;

  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  ${Button} {
    display: flex;
    max-width: 20rem;
    margin-bottom: 1rem;
    align-items: center;
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
`

export default PledgeCta
