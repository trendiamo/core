import styled from 'styled-components'

const Arrow = styled.div`
  width: ${({ width }) => width || '80px'};
  position: relative;
  background-color: ${({ color, lineColor }) => lineColor || color || '#333'};
  height: 2px;
  margin: 1.5rem 0;

  &::before {
    content: '▶';
    color: ${({ color }) => color || '#333'};
    position: absolute;
    top: -3px;
    right: -2px;
    font-size: 7px;
  }
`

export default Arrow
