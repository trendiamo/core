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
  width: 100%;
  white-space: normal;
  padding: 10px 5px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;

  &:hover,
  &:focus {
    background-color: #666;
  }
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

export { Button, DisabledButton }
