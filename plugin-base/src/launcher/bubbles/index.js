import BubbleButtons from './buttons'
import LauncherBubble from './launcher-bubble'
import React, { useMemo } from 'react'

const getBubbles = data => {
  if (!data) return {}

  const source = data.flow || data.launcher

  return {
    bubble: source.chatBubbleText,
    bubbleExtra: source.chatBubbleExtraText,
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
          position={position}
          setDisappear={setDisappear}
        />
      )}
    </div>
  )
}

export default LauncherBubbles
