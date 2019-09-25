import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'

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

const AuthMessage = styled.div`
  flex: 2;
  flex-basis: 500px;
  z-index: 100;
  flex-grow: 0;
  position: relative;

  text-align: center;
  padding: 20px;

  @media (min-width: 900px) {
    padding: 112px 0px 0px 100px;
    text-align: right;
  }

  @media (min-width: 1050px) {
    padding-left: 45px;
  }
`

const AuthFormFooter = styled.div`
  padding-top: 2rem;

  button,
  p {
    margin: 0 0 1rem;
  }
`

export { AuthButton, AuthLink, AuthFormFooter, AuthTitle, AuthText, AuthMessage }
