import Modal from './modal'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

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
  picture: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

const PictureModal = ({ closeModal, isOpen, setIsResourceLoaded, url }) => {
  const [isPictureLoaded, setIsPictureLoaded] = useState(false)

  const closePictureModal = useCallback(
    event => {
      event.stopPropagation()
      closeModal()
    },
    [closeModal]
  )

  const onPictureLoad = useCallback(() => {
    setIsPictureLoaded(true)
  }, [setIsResourceLoaded])

  return (
    <Modal allowBackgroundClose closeModal={closePictureModal} isOpen={isOpen} isResourceLoaded={isPictureLoaded}>
      <div style={styles.container} tabIndex="-1">
        <img alt="" onLoad={onPictureLoad} src={url} style={styles.picture} />
      </div>
    </Modal>
  )
}

export default PictureModal
