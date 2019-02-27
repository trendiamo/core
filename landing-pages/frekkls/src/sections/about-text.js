import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'
import { SmallContainer } from '../components/container'

const StyledSmallContainer = styled(SmallContainer)`
  font-size: 14px;
`

const StyledDiv = styled.div`
  padding-bottom: 18px;
  font-size: 26px;
`

const AboutText = styled(({ className, aboutText }) => (
  <Section className={className}>
    <h3>{aboutText.openerHeading}</h3>
    <StyledDiv>
      <h4>{aboutText.openerSubHeading}</h4>
    </StyledDiv>
    <StyledSmallContainer>
      <p>{aboutText.openerText}</p>
    </StyledSmallContainer>
  </Section>
))`
  background-color: #f2f4f7;
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.7em;

  p {
    font-size: 1.3em;
  }

  @media (min-width: 900px) {
    font-size: 1em;
  }
`

export default AboutText
