import mixpanel from 'ext/mixpanel'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { LauncherBubbles as LauncherBubblesBase } from 'plugin-base'
import { production } from 'config'

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
    onToggleContent: ({ data, onToggleContent, optimizelyClientInstance, showingContent }) => () => {
      if ((data.flow && data.flow.flowType === 'outro') || data.flowType === 'ht-outro') return

      if (production && optimizelyClientInstance && !showingContent) {
        optimizelyClientInstance.track('openLauncher', mixpanel.get_distinct_id())
      }
      onToggleContent()
    },
  })
)(LauncherBubbles)
