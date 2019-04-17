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
  onToggleContent,
  position,
  showingContent,
  extraBubble,
  setDisappear,
  config,
  offset,
  outroButtonsClick,
}) => (
  <div>
    <LauncherBubble
      bubble={bubble}
      config={config}
      disappear={disappear}
      extraBubbleExists={extraBubble && (extraBubble.message || extraBubble.buttons)}
      offset={offset}
      onClick={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
    <LauncherBubble
      bubble={extraBubble}
      config={config}
      disappear={disappear}
      extraBubble
      offset={offset}
      onClick={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
    {extraBubble && extraBubble.buttons && (
      <BubbleButtons
        bubble={extraBubble}
        config={config}
        disappear={disappear}
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
