import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { bigLauncherConfig } from 'config'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { imgixUrl, Launcher as LauncherBase } from 'plugin-base'

const Launcher = ({
  onToggleContent,
  personaPicUrl,
  position,
  showingContent,
  disappear,
  pulsating,
  compiledLauncherConfig,
}) => (
  <LauncherBase
    disappear={disappear}
    launcherConfig={compiledLauncherConfig}
    onClick={onToggleContent}
    personaPicUrl={personaPicUrl}
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
  withProps(({ persona, launcherConfig }) => ({
    personaPicUrl: imgixUrl(persona.profilePic.url, { fit: 'crop', w: launcherConfig.size, h: launcherConfig.size }),
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withHandlers({
    onToggleContent: ({ data, onToggleContent }) => () => {
      if ((data.flow && data.flow.flowType === 'outro') || data.flowType === 'ht-outro') return

      onToggleContent()
    },
  })
)(Launcher)
