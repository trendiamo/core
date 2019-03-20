import animateOnMount from 'shared/animate-on-mount'
import CloseIcon from 'shared/close-icon'
import Frame from 'shared/frame'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import PersonaPic from 'shared/persona-pic'
import PulsateEffect from './pulsate-effect'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, withHandlers, withProps } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

const StyledLauncherFrame = animateOnMount(styled(props => (
  <Frame {...omit(props, ['position', 'showingContent'])} />
)).attrs({
  title: 'Trendiamo Launcher',
})`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: ${({ position }) => (position === 'right-elevated' ? '36px' : '10px')};
  overflow: hidden;
  ${({ position }) => (position === 'left' ? 'left: 10px;' : 'right: 10px;')}
  width: 100px;
  height: 100px;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease;
`)

const LauncherFrame = compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(StyledLauncherFrame)

const Container = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 15%;
  left: 15%;
  background: #232323;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  animation: ${({ active }) => (active ? 'pulsationScaling 1.5s infinite' : 'none')};
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  @keyframes pulsationScaling {
    0% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
`

const Launcher = ({ optimizelyToggleContent, personaPicUrl, position, showingContent, onToggleContent, disappear }) => (
  <div>
    <LauncherFrame
      disappear={disappear}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    >
      <div>
        <PulsateEffect active={!showingContent} />
        <Container active={!showingContent} onClick={optimizelyToggleContent}>
          <PersonaPic active={!showingContent} url={personaPicUrl} />
          <CloseIcon active={showingContent} />
        </Container>
      </div>
    </LauncherFrame>
  </div>
)

export default compose(
  withProps(({ persona }) => ({
    personaPicUrl: imgixUrl(persona.profilePic.url, { fit: 'crop', w: 70, h: 70 }),
  })),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  }),
  withHandlers({
    optimizelyToggleContent: ({ onToggleContent, optimizelyClientInstance, showingContent }) => () => {
      if (optimizelyClientInstance && !showingContent) {
        optimizelyClientInstance.track('openLauncher', mixpanel.get_distinct_id())
      }
      onToggleContent()
    },
  })
)(Launcher)
