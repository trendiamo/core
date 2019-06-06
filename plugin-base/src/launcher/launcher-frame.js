import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Frame, useAnimateOnMount } from 'shared'

const StyledFrame = styled(props => (
  <Frame {...omit(props, ['position', 'entry', 'showingContent', 'disappear', 'launcherConfig'])} />
)).attrs({
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
      transition: all 1s;
      visibility: hidden;
      opacity: 0;
  `}
`

const LauncherFrame = ({ skipEntry, ...props }) => {
  const { entry } = useAnimateOnMount({ skipEntry })

  return <StyledFrame {...props} entry={entry} />
}

export default LauncherFrame
