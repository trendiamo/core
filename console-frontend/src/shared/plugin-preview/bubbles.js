import React from 'react'
import styled from 'styled-components'
import { LauncherBubbles } from 'plugin-base'

const BubblesContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: -10px;
  left: 0;
  right: -25px;
`
const Bubbles = ({ showingContent, position, bubbleText, bubbleExtraText, onToggleContent, launcherConfig }) => (
  <BubblesContainer>
    <LauncherBubbles
      bubble={{ message: bubbleText, timeEnd: null }}
      extraBubble={{ message: bubbleExtraText, timeEnd: null }}
      launcherConfig={launcherConfig}
      offset={{ x: -25, y: -10 }}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
  </BubblesContainer>
)

export default Bubbles
