import { Frame } from 'plugin-base'
import { h } from 'preact'
import { useRef } from 'preact/hooks'

const iframeStyle = ({ isModalOpen }) => ({
  border: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 2147483006,
  ...(isModalOpen ? {} : { display: 'none' }),
})

const ChatModals = ({ isModalOpen, ModalComponent }) => {
  const ref = useRef(null)

  return (
    <Frame ref={ref} style={iframeStyle({ isModalOpen })} title="Frekkls Modal">
      {isModalOpen ? ModalComponent : <div />}
    </Frame>
  )
}

export default ChatModals
