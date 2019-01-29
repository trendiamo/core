import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'
import { SmallContainer } from '../components/container'

const AboutText = styled(({ className, aboutText }) => (
  <Section className={className}>
    <h3>{aboutText.openerHeading}</h3>
    <SmallContainer>
      <p>{aboutText.openerText}</p>
    </SmallContainer>
  </Section>
))`
  background-image: linear-gradient(to bottom right, #ff8835, #ff553c);
  color: #fff;
  font-size: 0.7em;

  p {
    font-size: 1.3em;
  }

  @media (min-width: 900px) {
    font-size: 1em;
  }
`

export default AboutText
