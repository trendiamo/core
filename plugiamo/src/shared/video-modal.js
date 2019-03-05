import mixpanel from 'ext/mixpanel'
import Modal from './modal'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const VideoModal = ({ url, closeModal, isOpen }) => (
  <Modal allowBackgroundClose closeModal={closeModal} isOpen={isOpen}>
    <div style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <iframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="1"
          frameBorder="0"
          height="100%"
          src={url}
          title="Video player"
          width="100%"
        />
      </div>
    </div>
  </Modal>
)

export default compose(
  withHandlers({
    closeModal: ({ setIsOpen, url }) => event => {
      event.stopPropagation()
      setIsOpen(false)
      mixpanel.track('Closed Video', { hostname: location.hostname, url })
    },
  })
)(VideoModal)
