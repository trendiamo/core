import auth from 'auth'
import React from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import { Typography } from '@material-ui/core'

const ThumbUpContainer = styled.div`
  border: solid 3px #ffb652;
  border-radius: 50%;
  background-color: #cb7e3d;
  text-align: center;
  height: 30px;
  width: 30px;
`

const Coin = () => (
  <ThumbUpContainer>
    <ThumbUpIcon style={{ verticalAlign: 'middle', color: '#ffb652', padding: '3px' }} />
  </ThumbUpContainer>
)

const Container = styled.div`
  position: relative;
  margin: 20px 14px;
  background: #e7ecef;
  overflow: hidden;
  height: 57px;
  border-radius: 10px;
}
`

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Description = styled(Typography)`
  white-space: normal;
  text-align: center;
  text-transform: uppercase;
  margin-left: 12px;
  font-weight: bold;
  font-size: 13px;
  justify-self: flex-end;
  flex: 1;
  margin-top: 1px;
`

const Balance = styled(Typography)`
  font-size: 20px;
  color: #ffb652;
  margin-left: 10px;
`

const impactPointsBalance = Math.floor(Number(auth.getUser().impactPointsBalanceInCents / 100) || 0)

const Content = () => {
  return (
    <ContentContainer>
      <Coin />
      <Balance variant="subtitle1">{impactPointsBalance}</Balance>
      <Description variant="subtitle1">{'Impact Points'}</Description>
    </ContentContainer>
  )
}

const ImpactPointsBox = ({ sidebarOpen }) => {
  if (!sidebarOpen) return null

  return (
    <Container>
      <Content />
    </Container>
  )
}

export default ImpactPointsBox