import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import VideoModal from 'shared/video-modal'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { IconPlayButton } from 'plugin-base'

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

const VideoMessage = compose(
  withState('isOpen', 'setIsOpen', false),
  withProps(({ youtubeId }) => ({
    youtubeEmbedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&amp;mute=0&amp;controls=1&amp;playsinline=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1`,
    youtubePreviewImageUrl: `https://img.youtube.com/vi/${youtubeId}/0.jpg`,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  })),
  withHandlers({
    openModal: ({ setIsOpen, youtubeUrl }) => () => {
      setIsOpen(true)
      mixpanel.track('Open Video', { hostname: location.hostname, url: youtubeUrl })
    },
  }),
  withHandlers({
    onClick: ({ openModal }) => openModal,
    onKeyUp: ({ openModal }) => event => (event.key === 'Enter' ? openModal() : undefined),
  })
)(styled(({ className, setIsOpen, isOpen, onClick, onKeyUp, youtubeEmbedUrl, youtubePreviewImageUrl }) => (
  <div className={className} onClick={onClick} onKeyUp={onKeyUp} role="button" tabIndex={0}>
    <img alt="" src={youtubePreviewImageUrl} style={{ maxWidth: '100%' }} />
    <IconContainer>
      <IconPlayButton />
    </IconContainer>
    <VideoModal isOpen={isOpen} setIsOpen={setIsOpen} url={youtubeEmbedUrl} />
  </div>
))`
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  outline: 0;
  min-height: 195px;

  svg {
    width: 50px;
    height: 50px;
    fill: white;
  }
`)

export default VideoMessage
