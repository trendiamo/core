import Description from './description'
import Footer from './footer'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import React, { useCallback, useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { BrandLogo } from 'shared/uptous'
import { ReactComponent as NewTabIcon } from 'assets/icons/new-tab.svg'
import { Typography } from '@material-ui/core'

const StyledSection = styled(props => <Section {...omit(props, ['animate'])} />)`
  transition: all 1s 0.2s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 180px;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;
`

const Image = styled.img`
  object-fit: cover;
  user-select: none;
  width: 100%;
  height: 100%;
  border-radius: 6px 6px 0 0;
`

const MainContainer = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
`

const StyledBrandLogo = styled(BrandLogo)`
  position: absolute;
  top: -68px;
  left: 0;
  cursor: pointer;
  border-radius: 6px;
  @media (min-width: 960px) {
    top: -70px;
  }
`

const Subheader = styled.div`
  padding-left: 124px;
  min-height: 52px;
  @media (min-width: 960px) {
    padding-left: 126px;
    min-height: 56px;
  }
`

const BrandName = styled(Typography)`
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`

const StyledNewTabIcon = styled(NewTabIcon)`
  height: 20px;
  width: 20px;
`

const IconLink = styled.a`
  font-size: 0;
  vertical-align: middle;
  display: inline-block;
  margin-left: 10px;
`

const WebsiteButton = ({ affiliation, brand }) => {
  const url = affiliation
    ? `https://${brand.websiteHostname}/?aftk=${affiliation.token}`
    : `https://${brand.websiteHostname}`

  const onClick = useCallback(
    () => {
      mixpanel.track('Visited Brand Website', {
        hostname: window.location.hostname,
        url,
        brandId: brand.id,
        brand: brand.name,
      })
    },
    [brand.id, brand.name, url]
  )

  return (
    <IconLink href={url} onClick={onClick} rel="noopener noreferrer" target="_blank">
      <StyledNewTabIcon />
    </IconLink>
  )
}

const BrandCard = ({ affiliation, animate, brand, goToBrandPage, interests }) => {
  const trackToMixpanel = useCallback(
    eventName => {
      mixpanel.track(eventName, {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
        token: affiliation && affiliation.token,
      })
    },
    [affiliation, brand.id, brand.name]
  )

  const onClickCustomLink = useCallback(
    () => {
      trackToMixpanel('Clicked Custom Link')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, trackToMixpanel]
  )

  const onClickBrandHeaderImage = useCallback(
    () => {
      trackToMixpanel('Clicked Brand Header Image')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, trackToMixpanel]
  )

  const interest = useMemo(() => interests && interests.find(interest => interest.brand.id === brand.id), [
    brand.id,
    interests,
  ])

  const onLogoClick = useCallback(
    () => {
      trackToMixpanel('Clicked Brand Logo')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, trackToMixpanel]
  )

  const onBrandNameClick = useCallback(
    () => {
      trackToMixpanel('Clicked Brand Name')
      goToBrandPage(brand)
    },
    [brand, goToBrandPage, trackToMixpanel]
  )

  return (
    <StyledSection
      animate={animate}
      key={brand.id}
      title={
        <ImageContainer onClick={onClickBrandHeaderImage}>
          <Image src={brand.headerImageUrl} />
        </ImageContainer>
      }
    >
      <MainContainer>
        <StyledBrandLogo brand={brand} onClick={onLogoClick} />
        <Subheader>
          <BrandName onClick={onBrandNameClick} variant="h5">
            {brand.name}
          </BrandName>
          <WebsiteButton affiliation={affiliation} brand={brand} />
        </Subheader>
        <Description brand={brand} />
        <Footer
          affiliation={affiliation}
          brand={brand}
          goToBrandPage={goToBrandPage}
          interest={interest}
          onClickCustomLink={onClickCustomLink}
        />
      </MainContainer>
    </StyledSection>
  )
}

export default BrandCard
