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
        <span>{'Let us '}</span>
        <span>{'introduce '}</span>
        <span>{'ourselves'}</span>
      </Header>
      <VideoOuterContainer>
        <VideoInnerContainer>
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            src="https://www.youtube.com/embed/xP2vsPGkm8Q"
            title="Intro Video"
          ></iframe>
        </VideoInnerContainer>
      </VideoOuterContainer>
    </Container>
  </Section>
))`
  background-color: #e7ecef;
  min-height: 100vh;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  ${VideoOuterContainer} {
    width: 100%;
    max-width: 990px;
    box-shadow: 20px 20px 0 #272a32;
  }
  ${VideoInnerContainer} {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    &:before {
      content: '';
      position: absolute;
      top: -19px;
      left: 0;
      z-index: 1;

      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 19px 0 19px 32.9px;
      border-color: transparent transparent transparent #f05d5d;
    }
  }
  ${VideoInnerContainer} iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1000px) {
    ${Container} {
      max-width: 1400px;
      align-items: center;
    }
    ${VideoInnerContainer} {
      &:before {
        top: calc(50% - 58px);
        left: calc(120px - 18vw);

        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 58px 0 58px 97px;
        border-color: transparent transparent transparent #f05d5d;
      }
    }
  }
`

export default Video
