import Button from 'shared/button'
import Canvas from './canvas'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  position: relative;
  margin: 20px 14px;
  background: #fff;
  overflow: hidden;
  border-radius: 10px;
  height: 175px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}
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

const Description = styled(Typography)`
  white-space: normal;
  text-align: center;
`

const Price = styled.div`
  font-size: 26px;
  color: #0f7173;
  font-weight: 900;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
`

const priceForReferral = 10

const Content = () => {
  return (
    <ContentContainer>
      <Description variant="subtitle1">{'Refer a friend to become a promoter and earn'}</Description>
      <Price>{`${priceForReferral}€`}</Price>
      <Link to={routes.yourReferrals()}>
        <Button color="golden" size="small">
          {'Get Started'}
        </Button>
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
