import Modal from './modal'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 50,
    left: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

const PictureModal = ({ closeModal, isOpen, url }) => (
  <Modal allowBackgroundClose closeModal={closeModal} isOpen={isOpen}>
    <div style={styles.container}>
      <img alt="" src={url} style={styles.image} />
    </div>
  </Modal>
)

export default compose(
  withHandlers({
    closeModal: ({ closeModal }) => event => {
      event.stopPropagation()
      closeModal()
    },
  })
)(PictureModal)
