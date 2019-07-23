import Circle from './circle'
import CloseIcon from './close-icon'
import EmptyPersonaPic from './empty-persona-pic'
import LauncherFrame from './launcher-frame'
import PersonaPic from './persona-pic'
import PulsateEffect from './pulsate-effect'
import React from 'react'

const Launcher = ({
  disappear,
  frameStyleStr,
  launcherConfig,
  onClick,
  personaPic,
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
        {personaPic.url ? (
          <PersonaPic active={!showingContent} launcherConfig={launcherConfig} personaPic={personaPic} />
        ) : (
          <EmptyPersonaPic active={!showingContent} />
        )}
        <CloseIcon active={showingContent} launcherConfig={launcherConfig} />
      </Circle>
    </div>
  </LauncherFrame>
)

export default Launcher
