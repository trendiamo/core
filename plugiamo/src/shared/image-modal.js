import Modal from './modal'
import { h } from 'preact'
import { imgixUrl, stringifyRect } from 'plugin-base'
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
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

const ImageModal = ({ closeModal, isOpen, imageItem }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const closeImageModal = useCallback(
    event => {
      event.stopPropagation()
      closeModal()
    },
    [closeModal]
  )

  const onImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  return (
    <Modal allowBackgroundClose closeModal={closeImageModal} isOpen={isOpen} isResourceLoaded={isImageLoaded}>
      <div style={styles.container} tabIndex="-1">
        <img
          alt=""
          onLoad={onImageLoad}
          src={
            imageItem &&
            imageItem.url &&
            imgixUrl(imageItem.url, {
              rect: stringifyRect(imageItem.imgRect),
            })
          }
          style={styles.image}
        />
      </div>
    </Modal>
  )
}

export default ImageModal
