import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
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
  height: 195px;
  user-select: none;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    width: 50px;
    height: 50px;
    fill: white;
  }
`

const VideoMessage = ({ onClick, onKeyUp, youtubeId }) => {
  const youtubeEmbedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${youtubeId}?autoplay=1&amp;mute=0&amp;controls=1&amp;playsinline=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1`,
    [youtubeId]
  )
  const youtubePreviewImageUrl = useMemo(() => `https://img.youtube.com/vi/${youtubeId}/0.jpg`, [youtubeId])
  const youtubeUrl = useMemo(() => `https://www.youtube.com/watch?v=${youtubeId}`, [youtubeId])

  const newOnClick = useCallback(
    () => {
      onClick({ type: 'clickVideoMessage', item: { youtubeUrl, youtubeEmbedUrl } })
    },
    [onClick, youtubeEmbedUrl, youtubeUrl]
  )

  if (!youtubeId) return null

  return (
    <Container onClick={newOnClick} onKeyUp={onKeyUp} role="button" tabIndex={0}>
      <img alt="" src={youtubePreviewImageUrl} />
      <IconContainer>
        <IconPlayButton />
      </IconContainer>
    </Container>
  )
}

export default VideoMessage
