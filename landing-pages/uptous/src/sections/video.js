import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'

const VideoOuterContainer = styled.div``
const VideoInnerContainer = styled.div``

const Video = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Header>
        {'Let us '}
        <b>{'introduce ourselves'}</b>
      </Header>
      <VideoOuterContainer>
        <VideoInnerContainer>
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            src="https://www.youtube.com/embed/Aop3XjQ890A"
            title="Intro Video"
          ></iframe>
        </VideoInnerContainer>
      </VideoOuterContainer>
    </Container>
  </Section>
))`
  background-color: #00334a;
  ${Header} {
    color: #fff;
  }
  ${VideoOuterContainer} {
    border: 4px solid #12e5c4;
    border-radius: 14px;
    box-shadow: 0 0 30px rgba(18, 230, 196, 0.5);
    width: 100%;
    max-width: 990px;
  }
  ${VideoInnerContainer} {
    background-color: #12e5c4;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  ${VideoInnerContainer} iframe {
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1000px) {
    background-color: #fff;
    ${Header} {
      color: #00334b;
    }
  }
`

export default Video
