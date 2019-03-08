import React from 'react'
import styled from 'styled-components'

const ScreenContainer = styled.div`
  margin-top: 2rem;
  max-width: 800px;
  flex: 1;
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-end;

  @media (min-width: 900px) {
    width: 80%;
  }
`

const AspectRatio = styled.div`
  height: 0;
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border: 4px solid #aaa;
    border-bottom-width: 0;
    border-radius: 30px 30px 0 0;
    background-color: #000;
    padding: 20px 20px 0 20px;
    box-shadow: -1px 4px 20px 12px rgba(0, 0, 0, 0.2);
  }
`

const Video = () => (
  <ScreenContainer>
    <AspectRatio>
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        src="https://www.youtube.com/embed/5GdrKhhfJQw?controls=1&modestbranding=1"
        title="Frekkls Video"
      />
    </AspectRatio>
  </ScreenContainer>
)

export default Video
