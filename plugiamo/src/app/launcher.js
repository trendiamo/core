import animateOnMount from 'shared/animate-on-mount'
import { compose } from 'recompose'
import Frame from 'shared/frame'
import { h } from 'preact'
import { IconClose } from 'icons'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'

const TrendiamoLauncherFrame = animateOnMount(styled(Frame)`
  border: 0;
  z-index: 2147482999;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #232323;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06), 0 2px 32px 0 rgba(0, 0, 0, 0.16);
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease;
`)

const StyledIconClose = styled(IconClose)`
  fill: white;
  width: 20px;
  height: 20px;
`

const SellerPic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${({ url }) => url});
  transform: ${({ active }) => (active ? 'none' : 'rotate(30deg) scale(0)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ active }) => (active ? 'none' : 'rotate(-30deg)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const Container = styled.div`
  overflow: hidden;
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
`

const CloseIcon = ({ active }) => (
  <CloseIconContainer active={active}>
    <StyledIconClose />
  </CloseIconContainer>
)

const Launcher = ({ influencer, onToggleContent, showingContent }) => (
  <TrendiamoLauncherFrame>
    <SellerPic active={!showingContent} url={influencer.profilePic.url} />
    <Container onClick={onToggleContent}>
      <CloseIcon active={showingContent} />
    </Container>
  </TrendiamoLauncherFrame>
)

export default compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Launcher)
