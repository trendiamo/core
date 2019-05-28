import emojify from 'ext/emojify'
import { compose, withHandlers, withProps } from 'recompose'
import { h } from 'preact'
import { LauncherBubbles as LauncherBubblesBase } from 'plugin-base'

const LauncherBubbles = ({
  data,
  disappear,
  frameStyleStr,
  launcherConfig,
  onToggleContent,
  outroButtonsClick,
  position,
  setDisappear,
  showingContent,
}) => (
  <LauncherBubblesBase
    data={data}
    disappear={disappear}
    frameStyleStr={frameStyleStr}
    launcherConfig={launcherConfig}
    onClick={onToggleContent}
    outroButtonsClick={outroButtonsClick}
    position={position}
    setDisappear={setDisappear}
    showingContent={showingContent}
  />
)

export default compose(
  withProps(({ data }) => {
    const newData = JSON.parse(JSON.stringify(data))
    if (newData.flow) {
      newData.flow.chatBubbleText = emojify(newData.flow.chatBubbleText)
      newData.flow.chatBubbleExtraText = emojify(newData.flow.chatBubbleExtraText)
    } else if (newData.launcher) {
      newData.launcher.chatBubbleText = emojify(newData.launcher.chatBubbleText)
      newData.launcher.chatBubbleExtraText = emojify(newData.launcher.chatBubbleExtraText)
    }
    return {
      data: newData,
    }
  }),
  withHandlers({
    onToggleContent: ({ data, onToggleContent }) => () => {
      if (data.flow && data.flow.flowType === 'outro') return

      onToggleContent()
    },
  })
)(LauncherBubbles)
