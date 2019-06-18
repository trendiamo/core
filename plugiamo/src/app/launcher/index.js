import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { h } from 'preact'
import { Launcher as LauncherBase } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const Launcher = ({
  disappear,
  frameStyleStr,
  launcherConfig,
  onToggleContent,
  persona,
  position,
  pulsating,
  showingContent,
}) => {
  const compiledLauncherConfig = useMemo(
    () => ({
      ...launcherConfig,
      size: showingContent ? launcherConfig.smallSize : launcherConfig.size,
      frameSize: showingContent ? launcherConfig.smallFrameSize : launcherConfig.frameSize,
      offsetX: -10,
      offsetY: -10,
    }),
    [launcherConfig, showingContent]
  )

  const personaPic = useMemo(
    () => ({
      url: persona.profilePic.url,
      picRect: persona.picRect,
    }),
    [persona.picRect, persona.profilePic.url]
  )

  return (
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
}

export default withHotkeys({
  [escapeKey]: ({ onToggleContent, showingContent }) => () => {
    if (showingContent) onToggleContent()
  },
})(Launcher)
