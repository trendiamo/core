import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 20px 0 20px;
`

const ScreenContainer = styled.div`
  max-width: 800px;
  flex: 1;
  position: relative;
  width: 100%;

  @media (min-width: 900px) {
    width: 80%;
  }
`

const Screen = styled.div`
  border: 4px solid #aaa;
  border-radius: 30px 30px 0 0;
  background-color: #000;
  border-bottom-width: 0;
  width: 100%;
  padding-bottom: 56.25%;
  position: absolute;
  bottom: 0;

  iframe {
    width: 100%;
    height: 100%;
  }
`

const Video = () => (
  <ScreenContainer>
    <Screen>
      <VideoContainer>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          height="315"
          src="https://www.youtube.com/embed/5GdrKhhfJQw"
          title="Frekkls Video"
          width="560"
        />
      </VideoContainer>
    </Screen>
  </ScreenContainer>
)

const Hero = styled(({ className, hero }) => (
  <Section className={className}>
    <Container>
      <h2>{hero.openerHeading}</h2>
      <p>{hero.openerSubHeading}</p>
      <div className="email-input email-input-1" />
      <Video />
    </Container>
  </Section>
))`
  padding-top: 0;
  padding-bottom: 0;
  @media (min-width: 900px) {
    padding-top: 0;
    padding-bottom: 0;
  }

  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(100vh - 96px);
    padding-top: 3rem;
    padding-bottom: 0;

    @media (min-width: 900px) {
      min-height: calc(100vh - 120px);
    }
  }

  .email-input {
    width: 100%;
  }

  h2 {
    font-size: 30px;
    line-height: 1.13;
  }

  p {
    font-size: 21px;
    line-height: 1.67;
    color: #565656;
    max-width: 945px;
  }

  @media (min-width: 900px) {
    h2 {
      font-size: 36px;
    }
  }
`

export default Hero
