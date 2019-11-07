import Button from 'shared/button'
import Canvas from './canvas'
import Coin from 'shared/coin'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { withRouter } from 'react-router'

const Container = styled.div`
  position: relative;
  margin: 20px 14px;
  background: #fff;
  overflow: hidden;
  height: 175px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
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

const Description = styled(props => <Typography variant="subtitle1" {...props} />)`
  white-space: normal;
  text-align: center;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`

const Price = styled(props => <Typography variant="subtitle1" {...props} />)`
  color: #ffb652;
  font-size: 20px;
  margin-left: 8px;
`

const Content = withRouter(({ history }) => {
  const onClick = useCallback(
    () => {
      mixpanel.track('Clicked Referrals Promo', { hostname: window.location.hostname })
      history.push(routes.yourReferrals())
    },
    [history]
  )

  return (
    <ContentContainer>
      <Description>{'Refer a friend to become a promoter and earn'}</Description>
      <PriceContainer>
        <Coin />
        <Price>{50}</Price>
      </PriceContainer>
      <Button color="white" onClick={onClick} size="small">
        {'Get Started'}
      </Button>
    </ContentContainer>
  )
})

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
