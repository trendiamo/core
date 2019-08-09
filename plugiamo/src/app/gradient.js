import styled from 'styled-components'
import { h } from 'preact'
import { useAnimateOnMount } from 'plugin-base'

const StyledDiv = styled.div`
  z-index: ${({ pluginZIndex }) => pluginZIndex - 2};
  position: fixed;
  width: 500px;
  height: 500px;
  bottom: 0;
  ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')}
  pointer-events: none;
  background: radial-gradient(
    ellipse at bottom ${({ position }) => (position === 'left' ? 'left' : 'right')},
    rgba(29, 39, 54, 0.16) 0,
    rgba(29, 39, 54, 0) 72%
  );
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const Gradient = props => {
  const { entry } = useAnimateOnMount()

  return <StyledDiv {...props} entry={entry} />
}

export default Gradient
