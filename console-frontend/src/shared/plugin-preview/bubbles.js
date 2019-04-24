import React from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
import { LauncherBubbles } from 'plugin-base'

const BubblesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const Bubbles = ({ showingContent, position, data, onToggleContent, launcherConfig }) => (
  <BubblesContainer>
    <LauncherBubbles
      data={data}
      launcherConfig={launcherConfig}
      offset={{ x: -25, y: -10 }}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
  </BubblesContainer>
)

export default compose(
  withProps(({ bubbleExtraText, bubbleText, bubbleButtons }) => ({
    data: {
      flowType: bubbleButtons && 'outro',
      launcher: {
        chatBubble: {
          message: bubbleText,
        },
        ...(bubbleButtons ? { chatBubbleButtons: bubbleButtons } : { chatBubbleExtra: { message: bubbleExtraText } }),
      },
    },
  }))
)(Bubbles)
