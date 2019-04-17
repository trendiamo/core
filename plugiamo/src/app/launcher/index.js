import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { bigLauncherConfig } from 'config'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { imgixUrl, Launcher as LauncherBase } from 'plugin-base'
import { production } from 'config'

const Launcher = ({
  optimizelyToggleContent,
  personaPicUrl,
  position,
  showingContent,
  onToggleContent,
  disappear,
  pulsating,
  compiledConfig,
}) => (
  <LauncherBase
    config={compiledConfig}
    disappear={disappear}
    onClick={optimizelyToggleContent}
    onToggleContent={onToggleContent}
    personaPicUrl={personaPicUrl}
    position={position}
    pulsating={pulsating}
    showingContent={showingContent}
  />
)

export default compose(
  withState('config', 'setConfig', ({ config }) => config || bigLauncherConfig),
  withProps(({ config, showingContent }) => ({
    compiledConfig: {
      ...config,
      size: showingContent ? config.smallSize : config.size,
      frameSize: showingContent ? config.smallFrameSize : config.frameSize,
      offsetX: -10,
      offsetY: -10,
    },
  })),
  withProps(({ persona, config }) => ({
    personaPicUrl: imgixUrl(persona.profilePic.url, { fit: 'crop', w: config.size, h: config.size }),
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withHandlers({
    optimizelyToggleContent: ({ onToggleContent, config, showingContent }) => () => {
      if (production && config.optimizelyClientInstance && !showingContent) {
        config.optimizelyClientInstance.track('openLauncher', mixpanel.get_distinct_id())
      }
      onToggleContent()
    },
  })
)(Launcher)
