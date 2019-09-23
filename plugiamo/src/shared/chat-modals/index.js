import AssessmentStoreModal from 'special/assessment/store-modal'
import ImageModal from './image-modal'
import ImagesModal from './images-modal'
import VideoModal from './video-modal'
import { Frame } from 'plugin-base'
import { h } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

const iframeStyle = ({ isOpen }) => ({
  border: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2147483006,
  ...(isOpen ? {} : { display: 'none' }),
})

const ChatModals = ({ onCloseModal, onOpenModal, type, ...modalProps }) => {
  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!!type)
  }, [type])

  const closeModal = useCallback(() => {
    setOpen(false)
    onCloseModal && onCloseModal()
  }, [onCloseModal])

  useEffect(() => {
    if (!isOpen) return
    onOpenModal && onOpenModal()
  }, [isOpen, onOpenModal])

  return (
    <Frame ref={ref} style={iframeStyle({ isOpen })} title="Frekkls Modal">
      <div>
        {type === 'video' ? (
          <VideoModal closeModal={closeModal} {...modalProps} />
        ) : type === 'images' ? (
          <ImagesModal closeModal={closeModal} {...modalProps} />
        ) : type === 'image' ? (
          <ImageModal closeModal={closeModal} {...modalProps} />
        ) : type === 'storeModal' ? (
          <AssessmentStoreModal closeModal={closeModal} {...modalProps} />
        ) : null}
      </div>
    </Frame>
  )
}

export default ChatModals
