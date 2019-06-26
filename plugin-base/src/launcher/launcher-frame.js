import omit from 'lodash.omit'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Frame, useAnimateOnMount } from 'shared'

const StyledFrame = styled(props => {
  const ref = useRef(null)

  return <Frame {...omit(props, ['position', 'entry', 'showingContent', 'disappear', 'launcherConfig'])} ref={ref} />
}).attrs({
  title: 'Frekkls Launcher',
})`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: ${({ launcherConfig }) => launcherConfig.extraElevation - launcherConfig.offsetY}px;
  overflow: hidden;
  ${({ position }) => (position === 'left' ? 'left' : 'right')}: ${({ launcherConfig }) =>
    -launcherConfig.offsetX || 0}px;
  width: ${({ launcherConfig }) => launcherConfig.frameSize}px;
  height: ${({ launcherConfig }) => launcherConfig.frameSize}px;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: all 0.25s ease;
  ${({ disappear }) =>
    disappear &&
    `
      pointer-events: none;
      transition: all 1s;
      opacity: 0;
      visibility: hidden;
  `}
`

const LauncherFrame = props => {
  const { entry } = useAnimateOnMount()

  return <StyledFrame {...props} entry={entry} />
}

export default LauncherFrame
