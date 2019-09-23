import Content from './content'
import Header from './header'
import Modal from 'shared/modal'
import styled from 'styled-components'
import { h } from 'preact'

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  border: 0px;
  background: rgb(255, 255, 255);
  border-radius: 6px;
  overflow: hidden;
  width: 840px;
  max-height: 80vh;
  height: 1000px;
  min-height: 400px;
`

const ContentContainer = styled.div`
  overflow: auto;
  height: 100%;
`

const StoreModal = ({ closeModal, results, goToPrevStep, step, module }) => {
  // TODO: this was: Modal / Frame / ErrorBoundaries / FrameChild
  return (
    <Modal allowBackgroundClose closeModal={closeModal}>
      <ModalContainer>
        <ContentContainer>
          <Header goToPrevStep={goToPrevStep} step={step} />
          <Content flowType={module && module.flowType} results={results} />
        </ContentContainer>
      </ModalContainer>
    </Modal>
  )
}

export default StoreModal
