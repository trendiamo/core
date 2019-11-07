import Button from 'shared/button'
import Divider from 'shared/form-elements/divider'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: normal;
  justify-content: space-between;

  > div:first-child {
    width: auto;
  }

  > div:last-child {
    width: 100%;
    margin-top: 10px;

    @media (min-width: 960px) {
      justify-self: flex-end;
      width: auto;
      margin-top: 0;
      flex-shrink: 0;
    }
  }

  @media (min-width: 960px) {
    align-items: center;
    flex-direction: row;
  }
`

const CommissionRate = styled(Typography)`
  margin-right: 4px;

  span {
    margin-left: 4px;
    font-weight: 500;
  }
`

const MainContainer = styled.div`
  width: 100%;
  margin-top: 12px;

  @media (min-width: 960px) {
    margin-top: 16px;
  }
`

const Footer = ({ affiliation, brand, goToBrandPage, interest }) => {
  const track = useCallback(
    type => {
      mixpanel.track(type, {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
    },
    [brand.id, brand.name]
  )

  const onClickPromoteNow = useCallback(
    () => {
      track('Clicked Promote Now')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, track]
  )

  const onClickNotifyMe = useCallback(
    () => {
      track('Clicked Notify Me')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, track]
  )

  const onClickRemoveNotification = useCallback(
    () => {
      track('Clicked Remove Notification')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, track]
  )

  const onClickGetLink = useCallback(
    () => {
      track('Clicked Get Link')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, track]
  )

  return (
    <MainContainer>
      <Divider />
      <Container>
        <CommissionRate variant="subtitle1">
          {'Commission:'}
          <span>
            {Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })} {brand.commissionDescription}
          </span>
        </CommissionRate>
        <div>
          {brand.isPreview ? (
            <Button
              color={interest ? 'white' : 'primaryGradient'}
              flex
              fullWidthOnMobile
              inline
              onClick={interest ? onClickRemoveNotification : onClickNotifyMe}
              size="small"
            >
              {interest ? 'Remove notification' : 'Notify me'}
            </Button>
          ) : !affiliation ? (
            <Button color="primaryGradient" flex fullWidthOnMobile inline onClick={onClickPromoteNow} size="small">
              {'Promote now'}
            </Button>
          ) : (
            <Button color="primaryGradient" flex fullWidthOnMobile inline onClick={onClickGetLink} size="small">
              {'Get link'}
            </Button>
          )}
        </div>
      </Container>
    </MainContainer>
  )
}

export default Footer
