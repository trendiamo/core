import styled from 'styled-components'
import { branch, compose, renderNothing } from 'recompose'
import { h } from 'preact'

const PulsateCircle = styled.div`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  animation: pulsateEffect 1.5s infinite;
  @keyframes pulsateEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    30% {
      opacity: 0.4;
      background: #000;
    }
    100% {
      transform: scale(1);
      opacity: 0;
      background: #000;
    }
  }
`

const PulsateEffect = () => <PulsateCircle />

export default compose(branch(({ active }) => !active, renderNothing))(PulsateEffect)
