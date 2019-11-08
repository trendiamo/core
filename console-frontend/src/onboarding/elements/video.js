import React from 'react'
import styled from 'styled-components'

const Frame = styled.iframe`
  margin-bottom: 20px;
`

const Video = ({ url }) => (
  <Frame
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    frameBorder="0"
    height="300"
    src={url}
    title="onboarging-help-video-overlay"
    width="570"
  />
)

export default Video
