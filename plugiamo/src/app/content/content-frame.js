import animateOnMount from 'shared/animate-on-mount'
import Frame from 'shared/frame'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose } from 'recompose'
import { h } from 'preact'
import { IconClose } from 'icons'
import { MAIN_BREAKPOINT, WIDTH } from 'config'

const ContentFrameContainer = animateOnMount(styled.div`
  z-index: 2147483000;
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.25s ease;

  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  @media (min-width: ${MAIN_BREAKPOINT}px) {
    border-radius: 8px;
    bottom: 100px;
    ${({ position }) => (position === 'left' ? 'left: 30px;' : 'right: 30px;')}
    right: 30px;
    width: ${WIDTH}px;
    height: calc(100vh - 150px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    max-height: 500px;
  }
`)

const IFrame = compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
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

const CloseContent = styled(IconClose)`
  position: absolute;
  top: 8px;
  right: 8px;
  fill: #aaa;
  height: 20px;
  width: 20px;

  @media (min-width: ${MAIN_BREAKPOINT}px) {
    display: none;
  }
`

const ContentFrame = ({ children, onToggleContent, position }) => (
  <ContentFrameContainer position={position}>
    <IFrame onToggleContent={onToggleContent} showingContent>
      {children}
    </IFrame>
    <CloseContent onClick={onToggleContent} />
  </ContentFrameContainer>
)

export default ContentFrame
