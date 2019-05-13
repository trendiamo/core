import Circle from './circle'
import CloseIcon from './close-icon'
import EmptyPersonaPic from './empty-persona-pic'
import Frame from './launcher-frame'
import PersonaPic from './persona-pic'
import PulsateEffect from './pulsate-effect'
import React from 'react'

const Launcher = ({
  pulsating,
  disappear,
  showingContent,
  launcherConfig,
  googleAnalytics,
  onClick,
  position,
  personaPicUrl,
  isGAReady,
  setIsGAReady,
}) => (
  <Frame
    disappear={disappear}
    googleAnalytics={googleAnalytics}
    isGAReady={isGAReady}
    launcherConfig={launcherConfig}
    position={position}
    scrolling="no"
    setIsGAReady={setIsGAReady}
    showingContent={showingContent}
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
        {personaPicUrl ? (
          <PersonaPic active={!showingContent} url={personaPicUrl} />
        ) : (
          <EmptyPersonaPic active={!showingContent} />
        )}
        <CloseIcon active={showingContent} launcherConfig={launcherConfig} />
      </Circle>
    </div>
  </Frame>
)

export default Launcher
