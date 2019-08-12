import mixpanel from 'ext/mixpanel'
import Modal from './modal'
import styled from 'styled-components'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

const VideoOuterContainer = styled.div`
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
`

const VideoInnerContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const VideoModal = ({ url, closeModal, flowType }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const newCloseModal = useCallback(
    event => {
      event.stopPropagation()
      mixpanel.track('Closed Video', {
        flowType,
        hostname: location.hostname,
        url,
      })
      closeModal()
    },
    [closeModal, flowType, url]
  )

  const onVideoLoad = useCallback(() => {
    setIsVideoLoaded(true)
  }, [setIsVideoLoaded])

  return (
    <Modal allowBackgroundClose closeModal={newCloseModal} isResourceLoaded={isVideoLoaded}>
      <VideoOuterContainer>
        <VideoInnerContainer>
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="1"
            frameBorder="0"
            height="100%"
            onLoad={onVideoLoad}
            src={url}
            title="Video player"
            width="100%"
          />
        </VideoInnerContainer>
      </VideoOuterContainer>
    </Modal>
  )
}

export default VideoModal
