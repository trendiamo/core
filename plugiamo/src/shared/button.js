import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  background-color: ${({ outline }) => (outline ? '#fff' : '#7189cf')};
  border: 2px solid ${({ outline }) => (outline ? '#7189cf' : 'transparent')};
  color: ${({ outline }) => (outline ? '#7189cf' : '#fff')};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '140px')};
  padding: ${({ fullWidth, medium, small }) =>
    small ? '2px 4px' : medium ? '5px 8px' : fullWidth ? '10px 5px' : '10px 32px'};
  margin: ${({ center }) => (center ? '0 auto' : 'initial')};
  font-size: ${({ small }) => (small ? '12px' : 'inherit')};
  line-height: ${({ small, medium }) => (small || medium ? '15px' : '1.4')};
  letter-spacing: ${({ small }) => (small ? 'normal' : '1.12px')};
  border-radius: 2px
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  cursor: pointer;
  display: block;
  font-weight: 700;
  white-space: normal;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  user-select: none;
  vertical-align: middle;

  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }
`

export default Button
