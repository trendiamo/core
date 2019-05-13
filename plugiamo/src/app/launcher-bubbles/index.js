import googleAnalytics from 'ext/google-analytics'
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
  isGAReady,
}) => (
  <LauncherBubblesBase
    data={data}
    disappear={disappear}
    extraBubble={extraBubble}
    isGAReady={isGAReady}
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
    onToggleContent: ({ data, onToggleContent, showingContent }) => () => {
      if ((data.flow && data.flow.flowType === 'outro') || data.flowType === 'ht-outro') return

      if (production && !showingContent) {
        googleAnalytics.event({
          hitType: 'event',
          eventCategory: 'Launcher',
          eventAction: 'Click',
          eventLabel: 'openLauncher',
          page: location.href,
        })
      }
      onToggleContent()
    },
  })
)(LauncherBubbles)
