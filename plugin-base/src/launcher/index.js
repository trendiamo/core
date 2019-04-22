import Circle from './circle'
import CloseIcon from './close-icon'
import Frame from './launcher-frame'
import PersonaPic from './persona-pic'
import PulsateEffect from './pulsate-effect'
import React from 'react'

const Launcher = ({
  pulsating,
  onToggleContent,
  disappear,
  showingContent,
  launcherConfig,
  onClick,
  position,
  personaPicUrl,
}) => (
  <Frame
    disappear={disappear}
    launcherConfig={launcherConfig}
    onToggleContent={onToggleContent}
    position={position}
    scrolling="no"
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
        <PersonaPic active={!showingContent} url={personaPicUrl} />
        <CloseIcon active={showingContent} launcherConfig={launcherConfig} />
      </Circle>
    </div>
  </Frame>
)

export default Launcher
