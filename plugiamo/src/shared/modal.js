import Loader from 'icons/loader.svg'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { forwardRef } from 'preact/compat'
import { h } from 'preact'
import { IconClose } from 'plugin-base'
import { useEffect } from 'preact/hooks'

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: -50px;
  padding-bottom: 50px;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12340000000;
`

const StyledIconClose = styled(IconClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  fill: #fff;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 12340000005;
`

const Dialog = styled.div`
  width: 100%;
  max-width: 60em;
  background-color: #fff;
  max-height: 90%;
  overflow: auto;
`

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLoader = styled(Loader)`
  height: 150px;
  width: 150px;
`

const Modal = ({ allowBackgroundClose, closeModal, children, isResourceLoaded }, ref) => {
  useEffect(() => ref.current.focus(), [ref])

  return (
    <ModalContainer onClick={allowBackgroundClose && closeModal} ref={ref} role="presentation" tabIndex="-1">
      <StyledIconClose onClick={!allowBackgroundClose && closeModal} />
      <Dialog role="dialog">
        {isResourceLoaded === false && (
          <LoaderContainer>
            <StyledLoader />
          </LoaderContainer>
        )}
        {children}
      </Dialog>
    </ModalContainer>
  )
}

export default withHotkeys({
  [escapeKey]: ({ closeModal }) => closeModal,
})(forwardRef(Modal))
