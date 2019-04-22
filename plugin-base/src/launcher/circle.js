import styled from 'styled-components'

const Circle = styled.div`
  width: ${({ launcherConfig }) => launcherConfig.size}px;
  height: ${({ launcherConfig }) => launcherConfig.size}px;
  border-radius: 50%;
  position: absolute;
  bottom: ${({ launcherConfig }) => (launcherConfig.frameSize - launcherConfig.size) / 2}px;
  ${({ launcherConfig, position }) => `
    ${position === 'left' ? 'left' : 'right'}: ${(launcherConfig.frameSize - launcherConfig.size) / 2}px;
  `};
  background: #232323;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.06),
    0 2px ${({ launcherConfig }) => (launcherConfig.size > 80 ? 32 : 12)}px 0 rgba(0, 0, 0, 0.16);
  -webkit-perspective: 1000;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: all 0.25s ease;
  ${({ pulsating, active }) =>
    pulsating &&
    `
    animation: ${active ? '_frekkls_launcher_pulse 1.5s infinite' : 'none'};
    @keyframes _frekkls_launcher_pulse {
      0% {
        transform: scale(0.9);
      }
      70% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.9);
      }
    }
  `}
`

export default Circle
