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
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ active }) => (active ? 'none' : 'rotate(-30deg)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const CloseIcon = ({ active }) => (
  <CloseIconContainer active={active}>
    <StyledIconClose />
  </CloseIconContainer>
)

export default CloseIcon
