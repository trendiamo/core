import React, { useContext } from 'react'
import styled from 'styled-components'
import { IconClose } from 'icons'
import { ThemeContext } from 'ext'

const StyledIconClose = styled(IconClose)`
  fill: ${({ theme }) => theme.textColor};
  width: 20px;
  height: 20px;
`

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ launcherConfig }) => launcherConfig.size}px;
  height: ${({ launcherConfig }) => launcherConfig.size}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ active }) => (active ? 'none' : 'rotate(-30deg)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: all 0.25s ease;
`

const CloseIcon = ({ active, launcherConfig }) => {
  const theme = useContext(ThemeContext)

  return (
    <CloseIconContainer active={active} launcherConfig={launcherConfig}>
      <StyledIconClose theme={theme} />
    </CloseIconContainer>
  )
}

export default CloseIcon
