import styled from 'styled-components'
import { h } from 'preact'
import { IconClose } from 'plugin-base'
import { MAIN_BREAKPOINT } from 'config'

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  opacity: 0.8;
  padding: 8px;
  z-index: 12;

  @media (min-width: ${MAIN_BREAKPOINT}px) {
    display: none;
  }
`

const CloseContent = styled(IconClose)`
  display: block;
  height: 16px;
  width: 16px;
  fill: #fff;
  border-radius: 8px;
`

const Background = styled.div`
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
`

const CloseButton = ({ onToggleContent }) => (
  <Container onClick={onToggleContent}>
    <Background>
      <CloseContent />
    </Background>
  </Container>
)

export default CloseButton
