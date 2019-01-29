import React from 'react'
import styled from 'styled-components'

import Container, { SmallContainer } from '../components/container'
import Section from '../components/section'

const TopCta = styled(({ className, topCta }) => (
  <Section className={className}>
    <Container>
      <SmallContainer>
        <h3>{topCta.signupHeading}</h3>
        <p>{topCta.signupSubHeading}</p>
        <div className="email-input email-input-1" />
      </SmallContainer>
    </Container>
  </Section>
))`
  margin-top: 40px;
  background-color: #f9fafb;
`

export default TopCta
