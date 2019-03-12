import styled from 'styled-components'

const Button = styled.button`
  border: 1px solid #b3a87d;
  background: #eeece6;
  color: #333;
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: background 0.2s ease-out;
  &:active {
    transition: none;
    background: #fb0;
  }
  & + * {
    margin-left: 10px;
  }
`

export default Button
