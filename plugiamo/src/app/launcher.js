import animateOnMount from 'shared/animate-on-mount'
import Frame from 'shared/frame'
import { h } from 'preact'
import IconClose from 'icons/icon-close'
import styled from 'styled-components'

const TrendiamoLauncherFrame = animateOnMount(styled(Frame)`
  border: 0;
  z-index: 2147483000;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #849eda;
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
  background-image: url(https://yt3.ggpht.com/a-/ACSszfEr2ZPzTxeSJBq08hBbWlMBdy-X35tkyWqgGQ=s900-mo-c-c0xffffffff-rj-k-no);
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

const CloseIcon = ({ active, onClick }) => (
  <CloseIconContainer active={active} onClick={onClick}>
    <StyledIconClose />
  </CloseIconContainer>
)

const Launcher = ({ onToggleContent, showingContent }) => (
  <TrendiamoLauncherFrame>
    <div>
      <SellerPic active={!showingContent} onClick={onToggleContent} />
      <CloseIcon active={showingContent} onClick={onToggleContent} />
    </div>
  </TrendiamoLauncherFrame>
)

export default Launcher
