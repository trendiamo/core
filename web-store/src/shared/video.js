import React from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'
import { compose, withHandlers, withState } from 'recompose'

const YT = {
  PlayerState: {
    BUFFERING: 3,
    ENDED: 0,
    PAUSED: 2,
    PLAYING: 1,
    UNSTARTED: -1,
    VIDEO_CUED: 5,
  },
}

const StyledYouTube = styled(YouTube)`
  width: 100%;
  height: ${({ fullScreen }) => (fullScreen ? 'calc(100vh - 50px)' : '30vh')};
  min-height: 150px;
`

const Video = ({ fullScreen, onStateChange, videoId, setRef }) => (
  <StyledYouTube fullScreen={fullScreen} innerRef={setRef} onStateChange={onStateChange} videoId={videoId} />
)

export default compose(
  withState('fullScreen', 'setFullScreen', false),
  withHandlers(() => {
    let youtubeRef
    return {
      scrollToVideo: () => () => {
        youtubeRef.scrollIntoView({ behaviour: 'smooth' })
      },
      setRef: () => ref => {
        youtubeRef = ref.container
      },
    }
  }),
  withHandlers({
    onStateChange: ({ scrollToVideo, setFullScreen }) => event => {
      const playing = event.data === YT.PlayerState.PLAYING
      setFullScreen(playing)
      if (playing) scrollToVideo()
    },
  })
)(Video)
