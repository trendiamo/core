import mixpanel from 'ext/mixpanel'
import Modal from 'shared/modal'
import styled from 'styled-components'
import { h } from 'preact'
import { imgixUrl, stringifyRect } from 'plugin-base'
import { useCallback, useState } from 'preact/hooks'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 50;
  left: 0;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ImageModal = ({ closeModal, flowType, imageItem }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const newCloseModal = useCallback(() => {
    mixpanel.track('Closed Picture', {
      flowType,
      hostname: location.hostname,
      url: imageItem.url,
    })
    closeModal()
  }, [closeModal, flowType, imageItem.url])

  const onImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  const src = imageItem && imageItem.url && imgixUrl(imageItem.url, { rect: stringifyRect(imageItem.imgRect) })

  return (
    <Modal allowBackgroundClose closeModal={newCloseModal} isResourceLoaded={isImageLoaded}>
      <Container>
        <Img alt="" onLoad={onImageLoad} src={src} />
      </Container>
    </Modal>
  )
}

export default ImageModal
