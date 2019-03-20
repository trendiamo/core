import BubbleButtons from './buttons'
import LauncherBubble from './launcher-bubble'

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
  if (extraBubble.buttons || extraBubble.message) {
    bubble.timeOfElevation = 1.6
  }
  if (extraBubble.buttons) {
    bubble.timeEnd = null
  }
  return {
    bubble,
    extraBubble,
    [extraBubble.buttons && 'launcherType']: 'original',
  }
}

export { LauncherBubble, BubbleButtons, getBubbleProps }
