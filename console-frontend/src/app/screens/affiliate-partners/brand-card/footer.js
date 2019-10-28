import Button from 'shared/button'
import Divider from 'shared/form-elements/divider'
import mixpanel from 'ext/mixpanel'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  align-items: normal;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
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
    }
  }
  margin-top: 12px;
  @media (min-width: 960px) {
    margin-top: 16px;
    align-items: center;
    flex-direction: row;
  }
`

const CommissionRate = styled(Typography)`
  span {
    margin-left: 8px;
    color: #0f7173;
  }
  margin-right: 10px;
`

const MainContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  @media (min-width: 960px) {
    margin-top: 16px;
  }
`

const Footer = ({ affiliation, brand, onClickCustomLink, removeInterest, openBrandModal, interest }) => {
  const onClickPromoteNow = useCallback(
    () => {
      mixpanel.track('Clicked Promote Now', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
      openBrandModal()
    },
    [brand.id, brand.name, openBrandModal]
  )

  const onClickNotifyMe = useCallback(
    () => {
      mixpanel.track('Clicked Notify Me', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
      openBrandModal()
    },
    [brand.id, brand.name, openBrandModal]
  )

  const onClickRemoveNotification = useCallback(
    () => {
      mixpanel.track('Clicked Remove Notification', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
      removeInterest(interest)
    },
    [brand.id, brand.name, interest, removeInterest]
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
              {'Promote'}
            </Button>
          ) : (
            <Button color="primaryGradient" flex fullWidthOnMobile inline onClick={onClickCustomLink} size="small">
              {'Get link'}
            </Button>
          )}
        </div>
      </Container>
    </MainContainer>
  )
}

export default Footer
