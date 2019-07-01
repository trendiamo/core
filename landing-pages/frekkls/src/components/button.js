import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  background-color: transparent;
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
  font-size: 1vw;
  font-weight: 500;
  padding: 0.8vw 1vw;
  margin: 0 auto;
  outline: none;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
  font-family: Roboto, sans-serif;
  &:hover,
  &:active {
    color: ${({ color }) => (color === '#fff' ? '#000' : '#fff')};
    background-color: ${({ color }) => color};
  }
`

export default Button
