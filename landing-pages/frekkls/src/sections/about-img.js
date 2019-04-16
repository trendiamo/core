import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const AboutImg = styled(({ className, aboutImg }) => (
  <Section className={className}>
    <Container>
      <Img alt="The frekkls team" fluid={aboutImg.teamPicture.fluid} />
    </Container>
  </Section>
))`
  padding: 0;
  background-color: #f5f5f5;

  ${Container} {
    width: 100%;
    max-width: 1100px;
  }
`

export default AboutImg
