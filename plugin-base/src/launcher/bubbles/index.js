import BubbleButtons from './buttons'
import LauncherBubble from './launcher-bubble'
import React, { useMemo } from 'react'

const getBubbles = data => {
  if (!data) return {}

  const source = data.flow || data.launcher

  return {
    bubble: source.teaserMessage,
    bubbleExtra: source.extraTeaserMessage,
    bubbleButtons:
      source.chatBubbleButtonYes && source.chatBubbleButtonNo
        ? { buttonYes: source.chatBubbleButtonYes, buttonNo: source.chatBubbleButtonNo }
        : null,
    timeEnd: source.timeEnd,
  }
}

const LauncherBubbles = ({
  data,
  disappear,
  frameStyleStr,
  launcherConfig,
  offset,
  onClick,
  outroButtonsClick,
  position,
  setDisappear,
  pluginZIndex,
}) => {
  const { bubble, bubbleExtra, bubbleButtons, timeEnd } = useMemo(() => getBubbles(data), [data])

  const hasMoreThanOneBubble = useMemo(() => !!(bubbleExtra || bubbleButtons), [bubbleButtons, bubbleExtra])

  return (
    <div>
      {bubble && (
        <LauncherBubble
          disappear={disappear}
          frameStyleStr={frameStyleStr}
          hasMoreThanOneBubble={hasMoreThanOneBubble}
          isFirst
          launcherConfig={launcherConfig}
          message={bubble}
          offset={offset}
          onClick={onClick}
          pluginZIndex={pluginZIndex}
          position={position}
          timeEnd={timeEnd}
        />
      )}
      {bubbleExtra && (
        <LauncherBubble
          disappear={disappear}
          frameStyleStr={frameStyleStr}
          hasMoreThanOneBubble={hasMoreThanOneBubble}
          launcherConfig={launcherConfig}
          message={bubbleExtra}
          offset={offset}
          onClick={onClick}
          pluginZIndex={pluginZIndex}
          position={position}
          timeEnd={timeEnd}
        />
      )}
      {bubbleButtons && (
        <BubbleButtons
          data={bubbleButtons}
          disappear={disappear}
          frameStyleStr={frameStyleStr}
          launcherConfig={launcherConfig}
          offset={offset}
          onClick={outroButtonsClick}
          pluginZIndex={pluginZIndex}
          position={position}
          setDisappear={setDisappear}
        />
      )}
    </div>
  )
}

export default LauncherBubbles
