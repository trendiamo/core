import emojify from 'ext/emojify'
import { h } from 'preact'
import { LauncherBubbles as LauncherBubblesBase, timeout } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

const TIME_END = 20 // 20 seconds

// emojify and pass only what we want
const convertData = (data, step) => {
  const newData = JSON.parse(JSON.stringify(data))
  const oldFlow = newData.flow || newData.launcher
  const flow = {
    chatBubbleText: step >= 1 ? emojify(oldFlow.chatBubbleText) : null,
    chatBubbleExtraText: step >= 2 ? emojify(oldFlow.chatBubbleExtraText) : null,
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

  useEffect(() => {
    setComputedData(convertData(data, 0))
    timeout.set('LauncherBubblesUpdate', () => setComputedData(convertData(data, 1)), 500)
    timeout.set('LauncherBubblesUpdate', () => setComputedData(convertData(data, 2)), 2000)
    return () => timeout.clear('LauncherBubblesUpdate')
  }, [data])

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
