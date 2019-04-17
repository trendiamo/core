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
  config,
  onClick,
  position,
  personaPicUrl,
}) => (
  <Frame
    config={config}
    disappear={disappear}
    onToggleContent={onToggleContent}
    position={position}
    scrolling="no"
    showingContent={showingContent}
  >
    <div>
      {pulsating && <PulsateEffect active={!showingContent} config={config} />}
      <Circle active={!showingContent} config={config} onClick={onClick} position={position} pulsating={pulsating}>
        <PersonaPic active={!showingContent} url={personaPicUrl} />
        <CloseIcon active={showingContent} config={config} />
      </Circle>
    </div>
  </Frame>
)

export default Launcher
