import Frame from 'shared/frame'
import omit from 'lodash.omit'
import React, { useRef } from 'react'
import styled from 'styled-components'
import { keyframes, rollDuration } from './utils'
import { positioning } from 'tools'

const LauncherBubbleFrame = styled(props => {
  const ref = useRef(null)

  return (
    <Frame
      {...omit(props, [
        'bubbleTimeoutId',
        'extraBubble',
        'position',
        'textWidth',
        'animation',
        'elevation',
        'disappear',
        'launcherConfig',
      ])}
      ref={ref}
    />
  )
}).attrs({
  title: 'Frekkls Launcher Bubble',
})`
  border: 0;
  z-index: ${({ extraBubble }) => (extraBubble ? 2147483001 : 2147483000)};
  position: fixed;
  transition: bottom 0.4s cubic-bezier(0.43, 0.21, 0.35, 1.7);
  border-radius: ${({ position }) => (position === 'left' ? '10px 20px 20px 1px' : '20px 10px 1px 20px')};
  ${({ position, elevation, launcherConfig, offset }) =>
    positioning.get({ type: 'launcherBubbles', position, elevation, reset: true, launcherConfig, offset })}
  height: 40px;
  box-shadow: 2px 7px 40px 2px rgba(64, 67, 77, 0.28), 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
  background-color: #fbfbfb;
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ textWidth }) => textWidth + 24}px;
  @media (min-device-width: 360px) {
    max-width: ${({ textWidth }) => textWidth + 48}px;
  }
  overflow: hidden;
  ${({ animation }) =>
    !animation &&
    `
    width: 0;
    height: 0;
    border-radius:0;
    padding: 0;
  `}
  animation-name: ${({ animation }) =>
    animation === 'roll' ? '_frekkls_bubble_roll' : animation === 'unroll' && '_frekkls_bubble_unroll'};
  animation-duration: ${rollDuration}s;
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  ${({ disappear }) =>
    disappear &&
    `
    transition: all 1s;
    opacity: 0;
    visibility: hidden;
  `}
  ${({ position }) => keyframes({ position })}
`

export default LauncherBubbleFrame
