import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const Hr = styled.hr`
  border: 0;
  width: 100px;
  height: 2px;
  background: #6b6b6b;
  margin: 0 auto;
  margin-bottom: 20px;
`

const AboutStory = styled(({ className, aboutStory }) => (
  <Section className={className}>
    <Container>
      <h3>{aboutStory.textSectionHeading}</h3>
      <Hr />
      <p
        className="fr-column"
        dangerouslySetInnerHTML={{ __html: aboutStory.textSectionText.childContentfulRichText.html }}
      />
    </Container>
  </Section>
))`
  h3 {
    margin-bottom: 20px;
  }

  .fr-column {
    text-align: left;
    column-count: 1;
    font-size: 0.8em;
  }

  @media (min-width: 900px) {
    .fr-column {
      column-count: 3;
      font-size: 1em;
    }
  }
`

export default AboutStory
