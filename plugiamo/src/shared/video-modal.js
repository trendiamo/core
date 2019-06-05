import Modal from './modal'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

const VideoModal = ({ url, closeModal, isOpen }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const closeVideoModal = useCallback(
    event => {
      event.stopPropagation()
      closeModal()
    },
    [closeModal]
  )

  const onVideoLoad = useCallback(() => {
    setIsVideoLoaded(true)
  }, [setIsVideoLoaded])

  return (
    <Modal allowBackgroundClose closeModal={closeVideoModal} isOpen={isOpen} isResourceLoaded={isVideoLoaded}>
      <div style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
        </div>
      </div>
    </Modal>
  )
}

export default VideoModal
