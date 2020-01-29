import styled from 'styled-components'

const Button = styled.button`
  border: 1px solid #111;
  outline: none;
  background: #111;
  color: #fff;
  font-size: ${({ size }) => (size === 'small' ? '18px' : '20px')};
  font-weight: ${({ size }) => (size === 'small' ? 700 : 400)};
  cursor: pointer;
  border-radius: ${({ size }) => (size === 'small' ? '3px' : '0')};

  width: 100%;
  padding: ${({ size }) => (size === 'small' ? '8px 0' : '14px 0')};
  ${({ size }) => size === 'big' && 'text-transform: uppercase;'}

  @media (min-width: 1000px) {
    padding: ${({ size }) => (size === 'small' ? '8px 40px' : '14px 70px')};
    width: auto;
  }
`

export default Button
