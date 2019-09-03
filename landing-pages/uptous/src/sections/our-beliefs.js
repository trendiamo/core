import React, { useRef } from 'react'
import styled from 'styled-components'

import BelievingImg from '../images/believing'
import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'
import { useParallax } from '../hooks'

const StyledBelievingImg = styled(BelievingImg)``

const OurBeliefs = styled(({ className }) => {
  const ref = useRef(null)
  useParallax({ ref, scrollRatio: -0.2 })

  return (
    <Section className={className}>
      <StyledBelievingImg alt="" ref={ref} />
      <Container>
        <Header>
          <span>{'What we '}</span>
          <b>{'believe '}</b>
          <span>{'in'}</span>
        </Header>
        <p>{'We believe in a world in which people drive positive change.'}</p>
        <p>
          {
            "Where an impact-driven business is the best possible business to run. Where we team-up together and overcome the shortcomings of a political and 'old world economy' that is ignoring social injustices and the environmental crisis."
          }
        </p>
        <p>
          {
            "We are working for a world where the United Nation's sustainable development goals are achieved so we can look forward to the future."
          }
        </p>
      </Container>
    </Section>
  )
})`
  padding: 0;
  flex-direction: column;
  overflow: hidden;

  ${StyledBelievingImg} {
    flex: 1;
    transform: scale(1.5);
    transform-origin: left 30%;
    max-height: 70vh;
  }
  ${Container} {
    position: relative;
    z-index: 1;
    background-color: #107173;
    color: #fff;
    padding: 80px 20px 60px 20px;
  }

  ${Header} {
    color: #fff;
    position: absolute;
    top: -1.4em;
    text-shadow: 0 0 20px #000;
    b {
      color: #f05d5e;
    }
  }

  @media (min-width: 1000px) {
    flex-direction: row-reverse;

    ${Header} {
      position: static;
      flex-direction: column;
      text-shadow: none;
    }
    ${StyledBelievingImg} {
      flex: 2;
      transform: scale(1.1);
      max-height: unset;
    }
    ${Container} {
      flex: 1;
      padding: 100px;
    }
  }
`

export default OurBeliefs
