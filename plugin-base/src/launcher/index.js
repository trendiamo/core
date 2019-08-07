import Circle from './circle'
import CloseIcon from './close-icon'
import EmptySellerImg from './empty-seller-img'
import LauncherFrame from './launcher-frame'
import PulsateEffect from './pulsate-effect'
import React from 'react'
import SellerImg from './seller-img'

const Launcher = ({
  disappear,
  frameStyleStr,
  launcherConfig,
  onClick,
  sellerImg,
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
        {sellerImg.url ? (
          <SellerImg active={!showingContent} launcherConfig={launcherConfig} sellerImg={sellerImg} />
        ) : (
          <EmptySellerImg active={!showingContent} />
        )}
        <CloseIcon active={showingContent} launcherConfig={launcherConfig} />
      </Circle>
    </div>
  </LauncherFrame>
)

export default Launcher
