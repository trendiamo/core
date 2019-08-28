import BrandsModal from './brands-modal'
import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Button, IconButton } from '@material-ui/core'
import { uptousButtons } from 'app/theme'

const StyledSection = styled(Section)`
  margin-top: 10px;
  transition: all 1s 0.8s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
  &:first-child {
    margin-top: 0;
  }
`

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: 140px;
`

const ImageAndDescriptionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
`

const ImageContainer = styled.div`
  margin-right: 20px;
  text-align: center;
  width: 220px;
`

const Image = styled.img`
  margin-right: 20px;
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
`

const Description = styled.div`
  color: #1b3b50;
  flex-grow: 1;
  max-width: 600px;
`

const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
`

const NewTabIcon = styled.img`
  height: 30px;
  object-fit: contain;
`

const WebsiteButton = ({ websiteHostname }) => (
  <a href={`https://${websiteHostname}`} rel="noopener noreferrer" target="_blank">
    <IconButton>
      <NewTabIcon alt="" src="/img/icons/new_tab.svg" />
    </IconButton>
  </a>
)

const StyledClipboardInput = styled(ClipboardInput)`
  height: 44px;
  margin: 0 10px;
  min-width: 320px;
`

const MainButton = styled(Button)`
  border-radius: 30px;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: 18px;
  margin-left: 10px;
  opacity: 1;
  overflow: hidden;
  padding: 6px 18px;
  &:after {
    background: #000;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
  }
  &:hover:after {
    opacity: 0.2;
  }
  span {
    z-index: 1;
  }
`

const BrandCard = ({ animate, brand, createAffiliation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const affiliation = useMemo(() => brand.affiliations[0], [brand.affiliations])
  const affiliationUrl = useMemo(() => affiliation && `https://${brand.websiteHostname}/?aftk=${affiliation.token}`, [
    affiliation,
    brand.websiteHostname,
  ])

  const onCustomLinkClick = useCallback(() => {}, [])

  const onPromoteNowClick = useCallback(() => setIsModalOpen(true), [])

  return (
    <>
      <StyledSection animate={animate}>
        <MainContainer key={brand.id}>
          <ImageAndDescriptionContainer>
            <ImageContainer>
              <Image src={brand.logoUrl} />
            </ImageContainer>
            {!affiliation && <Description>{brand.description}</Description>}
          </ImageAndDescriptionContainer>
          <Actions>
            <WebsiteButton websiteHostname={brand.websiteHostname} />
            {affiliation && <StyledClipboardInput url={affiliationUrl} />}
            <MainButton
              onClick={affiliation ? onCustomLinkClick : onPromoteNowClick}
              style={affiliation ? uptousButtons.secondaryBg : uptousButtons.primaryGradient}
            >
              {affiliation ? 'Custom link' : 'Promote now'}
            </MainButton>
          </Actions>
        </MainContainer>
      </StyledSection>
      <BrandsModal brand={brand} createAffiliation={createAffiliation} open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  )
}

export default BrandCard
