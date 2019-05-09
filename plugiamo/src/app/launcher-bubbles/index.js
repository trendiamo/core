import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { LauncherBubbles as LauncherBubblesBase } from 'plugin-base'

const LauncherBubbles = ({
  data,
  disappear,
  extraBubble,
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
    extraBubble={extraBubble}
    launcherConfig={launcherConfig}
    onClick={onToggleContent}
    outroButtonsClick={outroButtonsClick}
    position={position}
    setDisappear={setDisappear}
    showingContent={showingContent}
  />
)

export default compose(
  withHandlers({
    onToggleContent: ({ data, onToggleContent }) => () => {
      if ((data.flow && data.flow.flowType === 'outro') || data.flowType === 'ht-outro') return

      onToggleContent()
    },
  })
)(LauncherBubbles)
