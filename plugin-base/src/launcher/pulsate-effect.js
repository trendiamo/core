import styled from 'styled-components'

const PulsateCircle = styled.div`
  position: absolute;
  display: ${({ active }) => (active ? 'block' : 'none')};
  top: 0;
  left: 0;
  width: ${({ config }) => config.frameSize}px;
  height: ${({ config }) => config.frameSize}px;
  border: none;
  border-radius: 50%;
  animation: pulsateEffect 1.5s infinite;
  background: radial-gradient(transparent, transparent, #000);
  @keyframes pulsateEffect {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`

export default PulsateCircle
