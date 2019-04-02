import styled from 'styled-components'

const PulsateCircle = styled.div`
  position: fixed;
  display: ${({ active }) => (active ? 'block' : 'none')};
  top: 0;
  left: 0;
  width: ${({ config }) => config.frameSize}px;
  height: ${({ config }) => config.frameSize}px;
  border: none;
  border-radius: 50%;
  animation: pulsateEffect 1.5s infinite;
  @keyframes pulsateEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    30% {
      opacity: 1;
      box-shadow: inset 0px 0px 30px 0px #000;
    }
    100% {
      transform: scale(1);
      opacity: 0;
      box-shadow: inset 0px 0px 30px 0px #000;
    }
  }
`

export default PulsateCircle
