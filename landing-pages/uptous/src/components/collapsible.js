import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #111;
  border-left: 0;
  border-right: 0;

  & + & {
    border-top: 0;
  }
`

const HeaderContainer = styled.div`
  color: #333;
  font-size: 32px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
  cursor: pointer;
`

const Content = styled.div`
  overflow: hidden;
  max-height: 0px;
  ${({ collapsed }) =>
    !collapsed &&
    `
    height: 100%;
    max-height: 100%;
    margin-bottom: 40px;
  `}
  transition: height 1s;
`

const HeaderText = styled.div`
  color: #333;
  font-weight: 700;
  font-size: 26px;

  @media (min-width: 1000px) {
    font-size: 36px;
  }
`

const ControllerIconContainer = styled.div`
  display: flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
`

const ControllerIcon = styled.div`
  position: relative;
  width: 4px;
  background: #333;
  height: 20px;
  transition: transform 0.6s 0.3s;
  ${({ collapsed }) => !collapsed && 'transform: rotate(90deg);'}

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -8px;
    right: -8px;
    height: 4px;
    background: #333;
    transform: translateY(-50%);
    transition: transform 0.2s;
    ${({ collapsed }) => !collapsed && 'transform: translateY(-50%) scaleX(0);'}
  }
`

const HeaderElement = ({ heading, headingHook, toggleCollapsed, collapsed }) => (
  <HeaderContainer id={headingHook} onClick={toggleCollapsed}>
    <HeaderText>{heading}</HeaderText>
    <ControllerIconContainer>
      <ControllerIcon collapsed={collapsed} />
    </ControllerIconContainer>
  </HeaderContainer>
)

const Collapsible = ({ headingHook, heading, children, openByDefault }) => {
  const [collapsed, setCollapsed] = useState(!openByDefault)

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed)
    if (!collapsed) return
    window.location.hash = ''
    window.location.hash = `#${headingHook}`
  }, [collapsed, headingHook])

  return (
    <Container>
      <HeaderElement
        collapsed={collapsed}
        heading={heading}
        headingHook={headingHook}
        toggleCollapsed={toggleCollapsed}
      ></HeaderElement>
      <Content collapsed={collapsed}>{children}</Content>
    </Container>
  )
}

export default Collapsible
