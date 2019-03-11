import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const StyledContainer = styled(Container)`
  box-shadow: 3px 7px 26px 0 rgba(0, 0, 0, 0.24);
  border-radius: 12px;
  position: relative;
  padding: 40px;

  @media (min-width: 900px) {
    padding: 100px 80px;
  }
`

const MailTo = styled.a`
  position: static;
  @media (min-width: 900px) {
    position: absolute;
    right: 30px;
  }
  @media (min-width: 1270px) {
    position: absolute;
    right: -30px;
  }
`

const AboutStory = styled(({ className, aboutStory }) => (
  <Section className={className}>
    <StyledContainer>
      <h3>{aboutStory.textSectionHeading}</h3>
      <p
        className="fr-column"
        dangerouslySetInnerHTML={{ __html: aboutStory.textSectionText.childContentfulRichText.html }}
      />
      <MailTo href="mailto:hello@trendiamo.com">
        <Button>{aboutStory.textSectionCta}</Button>
      </MailTo>
    </StyledContainer>
  </Section>
))`
  h3 {
    font-size: 46px;
    font-weight: 300;
    margin-bottom: 40px;
    text-align: left;
  }

  p {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.7);
  }

  .fr-column {
    text-align: left;
    column-count: 1;
    font-size: 0.8em;
  }

  @media (min-width: 900px) {
    .fr-column {
      column-count: 2;
      font-size: 1em;
    }
  }
`

export default AboutStory
