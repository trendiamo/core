import styled from 'styled-components'

const TextBar = styled.div`
  height: 14px;
  display: inline-block;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    height: 14px;
    width: 2px;
    background: #555;
    border-radius: 40%;
    animation: _frekkls_bubble_text_bar 0.6s infinite;
    opacity: 0;
    transform-origin: center;
  }
  @keyframes _frekkls_bubble_text_bar {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

const ChatBubbleBase = styled.div`
  font-size: 14px;
  line-height: 1.4;
  font-weight: bold;
  color: #333;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  opacity: 0;
  animation-name: ${({ animation }) =>
    animation === 'roll' ? '_frekkls_bubble_text_start' : '_frekkls_bubble_text_end'};
  animation-duration: ${({ animation, bubble }) =>
    animation === 'roll' ? bubble.timeStartDuration : bubble.timeEndDuration}s;
  animation-fill-mode: both;
  position: relative;
  user-select: none;
  @keyframes _frekkls_bubble_text_start {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes _frekkls_bubble_text_end {
    0% {
      opacity: 1;
      width: 100%;
    }
    50% {
      opacity: 0;
      width: 0%;
    }
  }
`

const Container = styled.div`
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`

const TextWidthMeasure = styled.div`
  font-size: 14px;
  font-weight: 700;
  top: 0;
  padding: 0;
  margin: 0;
  display: block;
  position: fixed;
  height: auto;
  width: auto;
  white-space: nowrap;
  visibility: hidden;
`

export { TextBar, TextWidthMeasure, Container, ChatBubbleBase }
