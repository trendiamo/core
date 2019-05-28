import React from 'react'
import styled from 'styled-components'
import { LauncherBubbles } from 'plugin-base'

const BubblesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const offset = { x: -25, y: -10 }

const Bubbles = ({
  bubbleButtons,
  bubbleExtraText,
  bubbleText,
  showingContent,
  position,
  onToggleContent,
  launcherConfig,
}) => {
  const data = {
    flowType: bubbleButtons && 'outro',
    launcher: {
      chatBubbleText: bubbleText,
      ...(bubbleButtons ? { chatBubbleButtons: bubbleButtons } : { chatBubbleExtraText: bubbleExtraText }),
    },
  }

  return (
    <BubblesContainer>
      <LauncherBubbles
        data={data}
        launcherConfig={launcherConfig}
        offset={offset}
        onClick={onToggleContent}
        position={position}
        showingContent={showingContent}
      />
    </BubblesContainer>
  )
}

export default Bubbles
