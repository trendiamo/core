import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  background-color: #000;
  border: 1px solid transparent;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  color: #fff;
  cursor: pointer;
  display: block;
  font-weight: 700;
  letter-spacing: normal;
  line-height: 1.4;
  white-space: normal;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '140px')};
  padding: ${({ fullWidth }) => (fullWidth ? '10px 5px' : '10px 32px')};
  margin: ${({ center }) => (center ? '0 auto' : 'initial')};

  &:hover,
  &:focus {
    background-color: #666;
  }
`

const SmallButton = Button.extend`
  width: auto;
  padding: 2px 4px;
  font-size: 12px;
`

const DisabledButton = Button.extend.attrs({
  disabled: 'disabled',
})`
  background-color: #666;
  color: #ddd;
  cursor: default;

  &:hover,
  &:focus {
    background-color: #666;
  }
`

export { Button, DisabledButton, SmallButton }
