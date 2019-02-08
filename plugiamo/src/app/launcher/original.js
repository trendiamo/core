import animateOnMount from 'shared/animate-on-mount'
import Bubble from 'app/bubble'
import BubbleButtons from 'app/bubble/buttons'
import CloseIcon from 'shared/close-icon'
import Frame from 'shared/frame'
import mixpanel from 'ext/mixpanel'
import PersonaPic from 'shared/persona-pic'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const StyledLauncherFrame = animateOnMount(styled(Frame).attrs({
  title: 'Trendiamo Launcher',
})`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: ${({ position }) => (position === 'right-elevated' ? '56px' : '30px')};
  ${({ position }) => (position === 'left' ? 'left: 30px;' : 'right: 30px;')}
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #232323;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease;
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
  overflow: hidden;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
`

const Launcher = ({
  extraBubble,
  optimizelyToggleContent,
  personaPicUrl,
  position,
  showingContent,
  bubble,
  onToggleContent,
  setDisappear,
  disappear,
}) => (
  <div>
    <Bubble
      bubble={bubble}
      disappear={disappear}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
    {extraBubble && extraBubble.message && (
      <Bubble
        bubble={extraBubble}
        disappear={disappear}
        extraBubble
        onToggleContent={onToggleContent}
        position={position}
        showingContent={showingContent}
      />
    )}
    {extraBubble && extraBubble.buttons && (
      <BubbleButtons
        bubble={extraBubble}
        disappear={disappear}
        position={position}
        setDisappear={setDisappear}
        showingContent={showingContent}
      />
    )}
    <LauncherFrame
      disappear={disappear}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    >
      <Container onClick={optimizelyToggleContent}>
        <PersonaPic active={!showingContent} url={personaPicUrl} />
        <CloseIcon active={showingContent} />
      </Container>
    </LauncherFrame>
  </div>
)

export default compose(
  withState('disappear', 'setDisappear', false),
  withProps(({ persona }) => ({
    personaPicUrl: persona.profilePic.url,
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
