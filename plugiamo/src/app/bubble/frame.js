import Frame from 'shared/frame'
import keyframes from './keyframes'
import styled from 'styled-components'

const ChatBubbleFrame = styled(Frame).attrs({
  title: 'Trendiamo Chat Bubble',
})`
  border: 0;
  z-index: 2147483000;
  position: fixed;
  bottom: ${({ position }) => (position === 'right-elevated' ? '103px' : '77px')};
  ${({ position }) =>
    position === 'left'
      ? `
    left: 89px;
    border-radius: 10px 20px 20px 1px;
  `
      : `
    right: 89px;
    border-radius: 20px 10px 1px 20px;
  `}
  height: 40px;
  box-shadow: 2px 7px 40px 2px rgba(64, 67, 77, 0.28), 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
  background-color: #fbfbfb;
  box-sizing: border-box;
  padding: 11px 16px;
  width: 100%;
  max-width: ${({ textWidth }) => textWidth + 48}px;
  overflow: hidden;
  ${({ animation }) =>
    !animation &&
    `
    width: 0;
    height: 0;
    border-radius:0;
    padding: 0;
  `}
  animation-name: ${({ animation }) =>
    animation === 'roll' ? '_frekkls_bubble_roll' : animation === 'unroll' && '_frekkls_bubble_unroll'};
  animation-duration: ${({ animation, bubble }) =>
    animation === 'roll' ? bubble.timeStartDuration : bubble.timeEndDuration}s;
  cursor: pointer;
  ${({ position }) => keyframes({ position })}
`

export default ChatBubbleFrame
