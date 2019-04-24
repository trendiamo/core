import BubbleButtons from './buttons'
import LauncherBubble from './launcher-bubble'
import React from 'react'
import { compose, withProps } from 'recompose'
import { defaultBubble, defaultBubbleButtons, defaultBubbleExtra } from './config'

const LauncherBubblesTemplate = ({
  bubble,
  disappear,
  onClick,
  position,
  showingContent,
  bubbleExtra,
  setDisappear,
  launcherConfig,
  offset,
  outroButtonsClick,
  bubbleExtraExists,
  bubbleButtons,
}) => (
  <div>
    <LauncherBubble
      bubble={bubble}
      bubbleButtons={bubbleButtons}
      bubbleExtraExists={bubbleExtraExists}
      disappear={disappear}
      launcherConfig={launcherConfig}
      offset={offset}
      onClick={onClick}
      position={position}
      showingContent={showingContent}
    />
    <LauncherBubble
      bubble={bubbleExtra}
      disappear={disappear}
      extraBubble
      launcherConfig={launcherConfig}
      offset={offset}
      onClick={onClick}
      position={position}
      showingContent={showingContent}
    />
    <BubbleButtons
      bubble={bubbleButtons}
      disappear={disappear}
      launcherConfig={launcherConfig}
      offset={offset}
      onClick={outroButtonsClick}
      position={position}
      setDisappear={setDisappear}
      showingContent={showingContent}
    />
  </div>
)

const mixBubblesDefault = ({ bubble, bubbleExtra, bubbleButtons }) => {
  const result = {
    bubble: { ...defaultBubble, ...bubble },
    bubbleExtra: { ...defaultBubbleExtra, ...bubbleExtra },
    ...{
      bubbleButtons: bubbleButtons && {
        ...defaultBubbleButtons,
        buttonYes: { ...defaultBubbleButtons.buttonYes, ...bubbleButtons.buttonYes },
        buttonNo: { ...defaultBubbleButtons.buttonNo, ...bubbleButtons.buttonNo },
      },
    },
  }
  return result
}

const getBubbles = data => {
  const comesFromApi = !!data.flow
  const source = data.flow || data.launcher
  const buttons = comesFromApi ? source : source.chatBubbleButtons
  const bubble = comesFromApi ? { message: source.chatBubbleText } : source.chatBubble
  const bubbleExtra = comesFromApi ? { message: source.chatBubbleExtraText } : source.chatBubbleExtra
  const bubbleButtons = buttons && {
    buttonYes: buttons.chatBubbleButtonYes && { message: buttons.chatBubbleButtonYes },
    buttonNo: buttons.chatBubbleButtonNo && { message: buttons.chatBubbleButtonNo },
  }
  if (bubbleButtons && bubbleButtons.buttonYes && bubbleButtons.buttonNo) {
    bubble.timeEnd = null
  }
  return { bubble, bubbleExtra, bubbleButtons }
}

const LauncherBubbles = compose(
  withProps(({ data }) => data && mixBubblesDefault(getBubbles(data))),
  withProps(({ bubbleExtra, bubbleButtons }) => ({
    bubbleExtraExists: !!(
      (bubbleExtra && bubbleExtra.message) ||
      (bubbleButtons && (bubbleButtons.buttonNo.message || bubbleButtons.buttonYes.message))
    ),
  }))
)(LauncherBubblesTemplate)

export default LauncherBubbles
