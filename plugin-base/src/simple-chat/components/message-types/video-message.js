import React from 'react'
import styled from 'styled-components'
import { compose, withProps, withState } from 'recompose'
import { IconPlayButton } from 'icons'

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  outline: 0;
  min-height: 195px;
  user-select: none;

  svg {
    width: 50px;
    height: 50px;
    fill: white;
  }
`

const VideoMessage = ({ onClick, onKeyUp, youtubePreviewImageUrl, youtubeUrl, youtubeEmbedUrl }) => (
  <Container
    onClick={() => onClick({ type: 'clickVideoMessage', item: { youtubeUrl, youtubeEmbedUrl } })}
    onKeyUp={onKeyUp}
    role="button"
    tabIndex={0}
  >
    <img alt="" src={youtubePreviewImageUrl} style={{ maxWidth: '100%' }} />
    <IconContainer>
      <IconPlayButton />
    </IconContainer>
  </Container>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withProps(({ youtubeId }) => ({
    youtubeEmbedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&amp;mute=0&amp;controls=1&amp;playsinline=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1`,
    youtubePreviewImageUrl: `https://img.youtube.com/vi/${youtubeId}/0.jpg`,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  }))
)(VideoMessage)
