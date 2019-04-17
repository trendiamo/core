import animateOnMount from 'shared/animate-on-mount'
import FrameBase from 'shared/frame'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'

const LauncherFrame = animateOnMount(styled(props => (
  <FrameBase
    {...omit(props, ['position', 'entry', 'setEntry', 'showingContent', 'onToggleContent', 'disappear', 'config'])}
  />
)).attrs({
  title: 'Trendiamo Launcher',
})`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: ${({ position, config }) =>
    (position === 'right-elevated' ? config.elevationWhenActive : 0) - config.offsetY}px;
  overflow: hidden;
  ${({ position }) => (position === 'left' ? 'left' : 'right')}: ${({ config }) => -config.offsetX || 0}px;
  width: ${({ config }) => config.frameSize}px;
  height: ${({ config }) => config.frameSize}px;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: all 0.25s ease;
  ${({ disappear }) =>
    disappear &&
    `
      transition: all 1s;
      visibility: hidden;
      opacity: 0;
  `}
`)

export default LauncherFrame
