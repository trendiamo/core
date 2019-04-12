import React from 'react'
import styled, { keyframes } from 'styled-components'

const shine = keyframes`
  0% {
    left: -80px;
  }
  100% {
    left: 300px;
  }
`

const ShinyItem = styled.div`
  position: relative;
  overflow: hidden;
  background: #e0e0e0;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    background: linear-gradient(90deg, #fff0, #fff1, #fff0);
    width: 80px;
    height: 200%;
    transform: translateY(-50%);
    transform-origin: top;
    animation: ${shine} 1.2s infinite;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Avatar = styled(ShinyItem)`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 20px;
`

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #e0e0e0;
`

const DummyText = styled(ShinyItem)`
  width: ${({ width }) => width || '100px'};
  height: 15px;
  margin: ${({ margin }) => margin || '15px 16px'};
  border-radius: 10px;
`

const UserMenu = () => (
  <div>
    <Avatar />
    <DummyText margin="40px 16px 15px" width="150px" />
    <Divider />
    <DummyText margin="25px 16px 15px" width="150px" />
    <DummyText width="120px" />
    <DummyText width="100px" />
    <DummyText width="80px" />
  </div>
)

const DummyMenu = ({ classes, sidebarOpen }) => (
  <Container>
    <UserMenu classes={classes} sidebarOpen={sidebarOpen} />
  </Container>
)

export default DummyMenu
