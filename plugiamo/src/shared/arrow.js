import styled from 'styled-components'

const Arrow = styled.div`
  width: ${({ width }) => width || '80px'};
  position: relative;
  background-color: ${({ color, lineColor }) => lineColor || color || '#333'};
  height: 2px;
  margin: 24px 0;

  &::before {
    content: '';
    color: ${({ color }) => color || '#333'};
    position: absolute;
    top: -3px;
    right: -2px;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 6px solid currentColor;
  }
`

export default Arrow
