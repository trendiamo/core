import animateOnMount from 'shared/animate-on-mount'
import CloseButton from './close-button'
import Frame from 'shared/frame'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle } from 'recompose'
import { h } from 'preact'
import { history, timeout, transition } from 'plugin-base'
import { MAIN_BREAKPOINT, WIDTH } from 'config'
import { positioning } from 'utils'

export const ContentFrameContainerBase = styled.div`
  z-index: 2147483000;
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry, isUnmounting }) => (entry || isUnmounting ? 'translateY(100%)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  overscroll-behavior: contain;

  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

const ContentFrameContainer = animateOnMount(styled(ContentFrameContainerBase)`
  @media (min-width: ${MAIN_BREAKPOINT}px) {
    border-radius: 8px;
    ${({ position }) => positioning.get({ type: 'content', position })}
    width: ${WIDTH}px;
    height: calc(100vh - 150px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    max-height: 500px;
    transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
`)

const IFrame = compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent }) => onToggleContent,
  }),
  lifecycle({
    componentWillUnmount() {
      history.removeListeners()
      timeout.clear('contentWrapper')
      timeout.clear('routeChange')
      transition.clear()
    },
  })
)(styled(Frame).attrs({
  title: 'Trendiamo Content',
})`
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`)

const ContentFrame = ({ children, isUnmounting, onToggleContent, position }) => (
  <ContentFrameContainer isUnmounting={isUnmounting} position={position}>
    <IFrame onToggleContent={onToggleContent}>
      <div>
        {children}
        <CloseButton onToggleContent={onToggleContent} />
      </div>
    </IFrame>
  </ContentFrameContainer>
)

export default ContentFrame
