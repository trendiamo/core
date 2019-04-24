import BubbleButtons from './buttons'
import LauncherBubble from './launcher-bubble'
import React from 'react'

const getExtraBubble = flow => {
  if (flow.flowType === 'outro') {
    return {
      buttons: [
        {
          value: 'no',
          message: flow.chatBubbleButtonNo,
          appearsAfter: 0,
        },
        {
          value: 'yes',
          message: flow.chatBubbleButtonYes,
          appearsAfter: 0.2,
        },
      ],
      timeStart: 2.5,
      timeEnd: null,
      timeStartDuration: 0.4,
    }
  }
  return { message: flow.chatBubbleExtraText }
}

const getBubbleProps = data => {
  if (!data) return
  const extraBubble = data.launcher ? data.launcher.chatBubbleExtra : getExtraBubble(data.flow)
  let bubble = data.launcher ? data.launcher.chatBubble : { message: data.flow.chatBubbleText }
  if (extraBubble.buttons) {
    bubble.timeEnd = null
  }
  return {
    bubble,
    extraBubble,
    [extraBubble.buttons && 'launcherPulsating']: false,
  }
}

const LauncherBubbles = ({
  bubble,
  disappear,
  onClick,
  position,
  showingContent,
  extraBubble,
  setDisappear,
  launcherConfig,
  offset,
  outroButtonsClick,
}) => (
  <div>
    <LauncherBubble
      bubble={bubble}
      disappear={disappear}
      extraBubbleExists={extraBubble && (extraBubble.message || extraBubble.buttons)}
      launcherConfig={launcherConfig}
      offset={offset}
      onClick={onClick}
      position={position}
      showingContent={showingContent}
    />
    <LauncherBubble
      bubble={extraBubble}
      disappear={disappear}
      extraBubble
      launcherConfig={launcherConfig}
      offset={offset}
      onClick={onClick}
      position={position}
      showingContent={showingContent}
    />
    {extraBubble && extraBubble.buttons && (
      <BubbleButtons
        bubble={extraBubble}
        disappear={disappear}
        launcherConfig={launcherConfig}
        offset={offset}
        onClick={outroButtonsClick}
        position={position}
        setDisappear={setDisappear}
        showingContent={showingContent}
      />
    )}
  </div>
)

export { LauncherBubbles, getBubbleProps }
