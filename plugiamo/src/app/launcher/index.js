import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { bigLauncherConfig } from 'config'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { Launcher as LauncherBase } from 'plugin-base'

const Launcher = ({
  compiledLauncherConfig,
  disappear,
  frameStyleStr,
  onToggleContent,
  personaPic,
  position,
  pulsating,
  showingContent,
}) => (
  <LauncherBase
    disappear={disappear}
    frameStyleStr={frameStyleStr}
    launcherConfig={compiledLauncherConfig}
    onClick={onToggleContent}
    personaPic={personaPic}
    position={position}
    pulsating={pulsating}
    showingContent={showingContent}
  />
)

export default compose(
  withState('config', 'setConfig', ({ config }) => config || bigLauncherConfig),
  withProps(({ launcherConfig, showingContent }) => ({
    compiledLauncherConfig: {
      ...launcherConfig,
      size: showingContent ? launcherConfig.smallSize : launcherConfig.size,
      frameSize: showingContent ? launcherConfig.smallFrameSize : launcherConfig.frameSize,
      offsetX: -10,
      offsetY: -10,
    },
  })),
  withProps(({ persona }) => ({
    personaPic: {
      url: persona.profilePic.url,
      picRect: persona.picRect,
    },
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withHandlers({
    onToggleContent: ({ data, onToggleContent }) => () => {
      if (data.flow && data.flow.flowType === 'outro') return

      onToggleContent()
    },
  })
)(Launcher)
