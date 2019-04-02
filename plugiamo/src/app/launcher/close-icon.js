import styled from 'styled-components'
import { h } from 'preact'
import { IconClose } from 'plugin-base'

const StyledIconClose = styled(IconClose)`
  fill: white;
  width: 20px;
  height: 20px;
`

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ config }) => config.size}px;
  height: ${({ config }) => config.size}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ active }) => (active ? 'none' : 'rotate(-30deg)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.25s ease;
`

const CloseIcon = ({ active, config }) => (
  <CloseIconContainer active={active} config={config}>
    <StyledIconClose />
  </CloseIconContainer>
)

export default CloseIcon
