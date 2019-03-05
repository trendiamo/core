import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const AboutImg = styled(({ className, aboutImg }) => (
  <Section className={className}>
    <Container>
      <img alt="" src={aboutImg.teamPicture.fixed.src} />
    </Container>
  </Section>
))`
  padding: 0;
  background-color: #f5f5f5;

  img {
    margin-bottom: -4px;
    width: 100%;
    max-width: 1100px;
  }
`

export default AboutImg
