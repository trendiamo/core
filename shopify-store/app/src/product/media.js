import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin-top: 4px;
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
`

const StyledIframe = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Media = ({ product }) =>
  (product.mediaItems || []).map(mediaItem => (
    <StyledDiv key={mediaItem}>
      <StyledIframe allow="autoplay; encrypted-media" allowFullScreen frameBorder="0" src={mediaItem} />
    </StyledDiv>
  ))

export default Media
