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

export default PulsateCircle
