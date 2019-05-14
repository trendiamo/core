import React from 'react'
import styled from 'styled-components'
import { LauncherBubbles } from 'plugin-base'

const BubblesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

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
      chatBubble: {
        message: bubbleText,
      },
      ...(bubbleButtons ? { chatBubbleButtons: bubbleButtons } : { chatBubbleExtra: { message: bubbleExtraText } }),
    },
  }

  return (
    <BubblesContainer>
      <LauncherBubbles
        data={data}
        launcherConfig={launcherConfig}
        offset={{ x: -25, y: -10 }}
        onClick={onToggleContent}
        position={position}
        showingContent={showingContent}
      />
    </BubblesContainer>
  )
}

export default Bubbles
