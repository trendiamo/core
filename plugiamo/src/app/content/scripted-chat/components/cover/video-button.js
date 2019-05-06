import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import VideoIcon from 'icons/ic-play.svg'
import VideoModal from 'shared/video-modal'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { extractYoutubeId } from 'app/content/scripted-chat/shared'
import { h } from 'preact'

const VideoButtonContainer = styled.div`
  font-size: 14px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'rgba(0,0,0,0.5)'};
  color: ${({ color }) => color || '#fff'}
  border-radius: 14px;
  padding: 6px 8px 6px 10px;
  display: inline-block;
  margin-top: 8px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`

const Icon = styled(VideoIcon)`
  width: 14px;
  height: 14px;
  margin-left: 4px;
  fill: ${({ color }) => color || '#fff'};
  display: inline-block;
  vertical-align: middle;
  transition: all 0.4s ease-in-out;
`

const Text = styled.div`
  color: ${({ color }) => color || '#fff'};
  display: inline-block;
  vertical-align: middle;
  transition: all 0.4s ease-in-out;
`

const VideoButton = ({ video, youtubeEmbedUrl, onClick, closeModal, isOpen }) => (
  <VideoButtonContainer backgroundColor={video.backgroundColor} onClick={onClick}>
    <Text color={video.textColor}>{video.text}</Text>
    {video.icon && <Icon color={video.textColor} />}
    <VideoModal closeModal={closeModal} isOpen={isOpen} url={youtubeEmbedUrl} />
  </VideoButtonContainer>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withProps(({ video }) => ({
    youtubeId: extractYoutubeId(video.url),
  })),
  withProps(({ youtubeId }) => ({
    youtubeEmbedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&amp;mute=0&amp;controls=1&amp;playsinline=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1`,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
  })),
  withHandlers({
    onClick: ({ setIsOpen, youtubeUrl }) => () => {
      setIsOpen(true)
      mixpanel.track('Opened Assessment Header Video', { hostname: location.hostname, url: youtubeUrl })
    },
    closeModal: ({ setIsOpen, youtubeUrl }) => () => {
      setIsOpen(false)
      mixpanel.track('Closed Assessment Header Video', { hostname: location.hostname, url: youtubeUrl })
    },
  })
)(VideoButton)
