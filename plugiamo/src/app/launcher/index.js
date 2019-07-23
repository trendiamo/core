import { h } from 'preact'
import { Launcher as LauncherBase, personaPic } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const Launcher = ({
  data,
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

  return (
    <LauncherBase
      disappear={disappear}
      frameStyleStr={frameStyleStr}
      launcherConfig={compiledLauncherConfig}
      onClick={onToggleContent}
      personaPic={personaPic(persona, data.flow && data.flow.usePersonaAnimation)}
      position={position}
      pulsating={pulsating}
      showingContent={showingContent}
    />
  )
}

export default Launcher
