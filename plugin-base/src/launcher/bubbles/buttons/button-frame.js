import Frame from 'shared/frame'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'

const ButtonFrame = styled(props => <Frame {...omit(props, ['action', 'button', 'left', 'clicked'])} />)`
  height: ${({ action }) => (action === 'disappear' || action === 'fadeOut' ? '40px' : 0)};
  width: ${({ action }) => (action === 'disappear' || action === 'fadeOut' ? '100%' : 0)};
  border: 2px solid #999;
  background: #fff;
  box-shadow: 2px 7px 40px 2px rgba(64, 67, 77, 0.28), 0px 2px 4px 0px rgba(0, 0, 0, 0.17);
  border-radius: 22px;
  overflow: hidden;
  opacity: ${({ action }) => (action !== 'appear' ? 1 : 0)}
  ${({ action }) => action && `animation-name: _frekkls_bubble_button_${action};`}
  animation-delay: ${({ button }) => button.appearsAfter}s;
  animation-duration: 0.4s;
  animation-fill-mode: forwards;
  ${({ button, clicked }) =>
    button.value === clicked &&
    `
    transition: background 0.1s;
    animation-delay: 1s;
    background: #ddd;
  `}
  & + iframe {
    margin-left: 8px;
  }
  @keyframes _frekkls_bubble_button_appear {
    0% {
      height: 0;
      width: 0%;
      border-radius: 50%;
      opacity: 0;
    }
    50% {
      border-radius: 50%;
    }
    100% {
      height: 40px;
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes _frekkls_bubble_button_disappear {
    0% {
      height: 40px;
      width: 100%;
      opacity: 1;
    }
    50% {
      border-radius: 50%;
    }
    100% {
      height: 0;
      width: 0%;
      border-radius: 50%;
      opacity: 0;
    }
  }

  @keyframes _frekkls_bubble_button_fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export default ButtonFrame
