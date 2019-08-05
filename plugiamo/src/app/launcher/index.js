import { h } from 'preact'
import { Launcher as LauncherBase, sellerPic } from 'plugin-base'
import { useMemo } from 'preact/hooks'

const Launcher = ({
  data,
  disappear,
  frameStyleStr,
  launcherConfig,
  onToggleContent,
  seller,
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
      position={position}
      pulsating={pulsating}
      sellerPic={sellerPic(seller, data.flow && data.flow.useSellerAnimation)}
      showingContent={showingContent}
    />
  )
}

export default Launcher
