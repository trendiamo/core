import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const onDiscoverClick = () => window.open('https://open.spotify.com/episode/3f3vWOaF0Molaz14RyGYTk', '_blank')

const Podcast = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <p>
        {
          'An inclusive platform giving sustainable businesses the spotlight they need. Everyone has access. Everyone can participate. Together we achieve the United Nations Sustainable Development Goals through a fair and more sustainable way of doing business.'
        }
      </p>
      <Button big color="#272a32" onClick={onDiscoverClick} wrap>
        {'Discover our podcast'}
      </Button>
      <iframe
        allow="encrypted-media"
        frameBorder="0"
        height="232"
        src="https://open.spotify.com/embed-podcast/show/6I35XQLBa4sSVXcEOBFlOf"
        title="Uptous Podcast"
        width="100%"
      ></iframe>
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

  @media (min-width: 1000px) {
    ${Container} {
      max-width: 1000px;
    }
  }
`

export default Podcast
