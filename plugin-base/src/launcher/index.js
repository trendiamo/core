import Circle from './circle'
import CloseIcon from './close-icon'
import EmptySellerPic from './empty-seller-pic'
import LauncherFrame from './launcher-frame'
import SellerPic from './seller-pic'
import PulsateEffect from './pulsate-effect'
import React from 'react'

const Launcher = ({
  disappear,
  frameStyleStr,
  launcherConfig,
  onClick,
  sellerPic,
  position,
  pulsating,
  showingContent,
}) => (
  <LauncherFrame
    disappear={disappear}
    launcherConfig={launcherConfig}
    position={position}
    scrolling="no"
    showingContent={showingContent}
    styleStr={frameStyleStr}
  >
    <div>
      {pulsating && <PulsateEffect active={!showingContent} launcherConfig={launcherConfig} />}
      <Circle
        active={!showingContent}
        launcherConfig={launcherConfig}
        onClick={onClick}
        position={position}
        pulsating={pulsating}
      >
        {sellerPic.url ? (
          <SellerPic active={!showingContent} launcherConfig={launcherConfig} sellerPic={sellerPic} />
        ) : (
          <EmptySellerPic active={!showingContent} />
        )}
        <CloseIcon active={showingContent} launcherConfig={launcherConfig} />
      </Circle>
    </div>
  </LauncherFrame>
)

export default Launcher
