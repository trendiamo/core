import Canvas from './canvas'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  margin: 20px 14px;
  background: #f4f8f8;
  overflow: hidden;
  border-radius: 10px;
  height: 175px;
`

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  user-select: none;
`

const Description = styled.div`
  color: #8799a4;
  font-size: 14px;
  width: 100%;
  white-space: normal;
  text-align: center;
`

const Price = styled.div`
  font-size: 30px;
  color: #12e5c4;
  font-weight: 700;
`

const Button = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: #fb0;
  border-radius: 22px;
  overflow: hidden;
  padding: 9px 15px;
  cursor: pointer;
`

const priceForReferral = 50

const Content = () => {
  return (
    <ContentContainer>
      <Description>{'Refer a friend to become a promoter and earn'}</Description>
      <Price>{`${priceForReferral}€`}</Price>
      <Link to={routes.yourReferrals()}>
        <Button>{'Get Started'}</Button>
      </Link>
    </ContentContainer>
  )
}

const ReferralBox = ({ sidebarOpen }) => {
  if (!sidebarOpen) return null

  return (
    <Container>
      <Content />
      <Canvas />
    </Container>
  )
}

export default ReferralBox
