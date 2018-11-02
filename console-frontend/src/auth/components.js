import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const AuthButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const AuthLink = styled.a`
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
`

const AuthTitle = styled(Typography)`
  color: #fff;
  margin-bottom: 10px;
  @media (max-width: 1050px) {
    font-size: 28px;
  }
  @media (max-width: 900px) {
    font-size: 18px;
  }
`

const AuthText = styled(Typography)`
  color: #fff;
  margin-bottom: 10px;
`

export { AuthButton, AuthLink, AuthTitle, AuthText }
