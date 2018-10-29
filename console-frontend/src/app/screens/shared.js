import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const StyledAvatar = styled(Avatar)`
  background-color: #f50057;
  margin: 8px;
`

const StyledAuthForm = styled.form`
  margin-top: 8px;
  width: 100%;
`

const StyledForm = styled.form`
  margin-top: 8px;
  width: 33%;
`

const AuthMain = styled.main`
  display: block;
  padding: 0 20px;
  margin: 20px auto 120px;

  @media (min-width: 900px) {
    padding: 0px 40px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    max-width: 1200px;
  }

  @media (min-width: 1050px) {
    padding: 0 85px;
  }
`
const Main = styled.main`
  display: block;
`

const AuthStyledPaper = styled(Paper)`
  display: block;
  text-align: center;
  position: relative;
  padding: 48px 24px 32px;
  z-index: 100;

  margin: auto;
  width: auto;
  max-width: 380px;
  min-width: 200px;
  flex-shrink: 0;

  @media (min-width: 900px) {
    width: 380px;
    margin: 0;
  }
`

const StyledPaper = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
`

const StyledButton = styled(Button)`
  margin-top: 24px;
`

const AuthButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.12);
  color: #fff;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const LogotypeContainer = styled.div`
  display: none;
  position: relative;

  @media (min-width: 900px) {
    display: block;
    margin: 60px auto 60px;
    padding: 0 40px;
    max-width: 1200px;
  }

  @media (min-width: 1050px) {
    padding: 0 85px;
  }
`

const BackgroundImage = styled.div`
    background-image: linear-gradient(to bottom, #000000, #344359);
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;

    @media (min-width: 900px) {
      height: 130vh;
      bottom: 0;
      top: auto;
      background-image: url('${props => props.url}');
      background-color: #f2f4f7;
      background-repeat: no-repeat;
      background-position-x: right;
      background-position-y: bottom;
      background-size: contain;
      min-height: 65vw;
    }

`

const AuthLink = styled.a`
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
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

export {
  AuthButton,
  AuthLink,
  AuthMessage,
  AuthTitle,
  AuthText,
  BackgroundImage,
  LogotypeContainer,
  StyledAvatar,
  StyledAuthForm,
  Main,
  AuthMain,
  AuthStyledPaper,
  StyledButton,
  StyledPaper,
  StyledForm,
}
