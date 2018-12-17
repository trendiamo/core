import Link from 'shared/link'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Typography } from '@material-ui/core'

const ease = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 50px);
  }
  100%{
    opacity: 1;
  }
`

const spark = keyframes`
  0% {
    opacity: 0.3;
    left: -200px;
  }
  70% {
    opacity: 0.8;
  }
  100%{
    opacity: 0;
    left: 600px;
  }
`

const Container = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  padding: 10px;
`

const Image = styled.img`
  animation: ${ease} 1.2s ease-out;
  animation-delay: 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  max-width: 100%;
`

const Header = styled(Typography)`
  margin-top: 22px;
  animation: ${ease} 1s ease-out;
  opacity: 0;
  animation-delay: 0.6s;
  animation-fill-mode: forwards;
`

const Description = styled(Typography)`
  margin-top: 7px;
  animation: ${ease} 1s ease-out;
  opacity: 0;
  animation-delay: 0.6s;
  animation-fill-mode: forwards;
`

const StyledButton = styled(Button)`
  margin-top: 22px;
  padding: 14px 60px;
  letter-spacing: 3px;
  animation: ${ease} 1s ease-out;
  opacity: 0;
  animation-delay: 0.7s;
  animation-fill-mode: forwards;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    background linear-gradient(90deg,transparent,rgba(255, 255, 255, 0.3),rgba(255, 255, 255, 0.5));
    width: 120px;
    top: -1px;
    opacity: 0;
    height: 51px;
    animation: ${spark} 2.4s;
    animation-delay: 2s;
  }
`

const BlankState = ({ title, imageSource, description, route }) => (
  <Container>
    <Image alt="" src={imageSource} />
    <Header variant="h4">{title}</Header>
    <Description variant="body1">{description}</Description>
    <Link to={route}>
      <StyledButton color="primary" variant="contained">
        {'Create New'}
      </StyledButton>
    </Link>
  </Container>
)

export default BlankState
