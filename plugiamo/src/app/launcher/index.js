import animateOnMount from 'shared/animate-on-mount'
import CloseIcon from './close-icon'
import Frame from 'shared/frame'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import PersonaPic from 'shared/persona-pic'
import PulsateEffect from './pulsate-effect'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'
import { launcherConfig } from 'config'

const StyledLauncherFrame = animateOnMount(styled(props => (
  <Frame {...omit(props, ['position', 'showingContent'])} />
)).attrs({
  title: 'Trendiamo Launcher',
})`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: ${({ position }) => (position === 'right-elevated' ? launcherConfig.elevationWhenActive : 0) + 10}px;
  overflow: hidden;
  ${({ position }) => (position === 'left' ? 'left: 10px;' : 'right: 10px;')}
  width: ${({ config }) => config.frameSize}px;
  height: ${({ config }) => config.frameSize}px;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: all 0.25s ease;
  ${({ disappear }) =>
    disappear &&
    `
      transition: all 1s;
      visibility: hidden;
      opacity: 0;
  `}
`)

const LauncherFrame = compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(StyledLauncherFrame)

const Container = styled.div`
  width: ${({ config }) => config.size}px;
  height: ${({ config }) => config.size}px;
  border-radius: 50%;
  position: absolute;
  bottom: ${({ config }) => (config.frameSize - config.size) / 2}px;
  ${({ config, position }) => `
    ${position === 'left' ? 'left' : 'right'}: ${(config.frameSize - config.size) / 2}px;
  `};
  background: #232323;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: all 0.25s ease;
  ${({ pulsating, active }) =>
    pulsating &&
    `
    animation: ${active ? '_frekkls_launcher_pulse 1.5s infinite' : 'none'};
    @keyframes _frekkls_launcher_pulse {
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
  `}
`

const Launcher = ({
  optimizelyToggleContent,
  personaPicUrl,
  position,
  showingContent,
  onToggleContent,
  disappear,
  pulsating = true,
  config,
}) => (
  <div>
    <LauncherFrame
      config={config}
      disappear={disappear}
      onToggleContent={onToggleContent}
      position={position}
      scrolling="no"
      showingContent={showingContent}
    >
      <div>
        {pulsating && <PulsateEffect active={!showingContent} config={config} />}
        <Container
          active={!showingContent}
          config={config}
          onClick={optimizelyToggleContent}
          position={position}
          pulsating={pulsating}
        >
          <PersonaPic active={!showingContent} url={personaPicUrl} />
          <CloseIcon active={showingContent} config={config} />
        </Container>
      </div>
    </LauncherFrame>
  </div>
)

export default compose(
  withState('config', 'setConfig', launcherConfig),
  withProps(({ persona }) => ({
    personaPicUrl: imgixUrl(persona.profilePic.url, { fit: 'crop', w: launcherConfig.size, h: launcherConfig.size }),
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
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { showingContent, setConfig } = this.props
      if (prevProps.showingContent !== showingContent) {
        const closedConfig = {
          size: launcherConfig.smallSize,
          frameSize: launcherConfig.smallFrameSize,
        }
        setConfig(showingContent ? closedConfig : launcherConfig)
      }
    },
  })
)(Launcher)
