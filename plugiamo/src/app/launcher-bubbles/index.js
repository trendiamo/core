import useEmojify from 'ext/hooks/use-emojify'
import { h } from 'preact'
import { LauncherBubbles as LauncherBubblesBase } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

const TIME_END = 20 // 20 seconds

// emojify and pass only what we want
const convertData = (emojify, data, step) => {
  const newData = JSON.parse(JSON.stringify(data))
  const oldFlow = newData.flow || newData.launcher
  const flow = {
    teaserMessage: step >= 1 ? emojify(oldFlow.teaserMessage) : null,
    extraTeaserMessage: step >= 2 ? emojify(oldFlow.extraTeaserMessage) : null,
    chatBubbleButtonNo: step >= 2 ? emojify(oldFlow.chatBubbleButtonNo) : null,
    chatBubbleButtonYes: step >= 2 ? emojify(oldFlow.chatBubbleButtonYes) : null,
    timeEnd: oldFlow.chatBubbleButtonNo || oldFlow.chatBubbleButtonYes ? null : TIME_END,
  }

  return { flow }
}

const LauncherBubbles = ({
  data,
  disappear,
  frameStyleStr,
  launcherConfig,
  onToggleContent,
  outroButtonsClick,
  position,
  setDisappear,
}) => {
  const [computedData, setComputedData] = useState(null)

  const newOnToggleContent = useCallback(() => {
    if (data.flow && data.flow.flowType === 'outro') return

    onToggleContent()
  }, [data.flow, onToggleContent])

  const emojify = useEmojify()
  useEffect(() => {
    if (!emojify) return
    let didCancel = false
    setComputedData(convertData(emojify, data, 0))
    setTimeout(() => didCancel || setComputedData(convertData(emojify, data, 1)), 500)
    setTimeout(() => didCancel || setComputedData(convertData(emojify, data, 2)), 2000)
    return () => (didCancel = true)
  }, [data, emojify])

  return (
    <LauncherBubblesBase
      data={computedData}
      disappear={disappear}
      frameStyleStr={frameStyleStr}
      launcherConfig={launcherConfig}
      onClick={newOnToggleContent}
      outroButtonsClick={outroButtonsClick}
      position={position}
      setDisappear={setDisappear}
    />
  )
}

export default LauncherBubbles
