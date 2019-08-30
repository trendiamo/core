import BrandsModal from './brands-modal'
import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { IconButton } from '@material-ui/core'

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
  margin: 0 10px;
  min-width: 320px;
`

const BrandCard = ({ animate, brand, createAffiliation, setIsCustomLinkModalOpen, setSelectedBrand }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const affiliation = useMemo(() => brand.affiliations[0], [brand.affiliations])
  const affiliationUrl = useMemo(() => affiliation && `https://${brand.websiteHostname}/?aftk=${affiliation.token}`, [
    affiliation,
    brand.websiteHostname,
  ])

  const onCustomLinkClick = useCallback(
    () => {
      setIsCustomLinkModalOpen(true)
      setSelectedBrand(brand)
    },
    [brand, setIsCustomLinkModalOpen, setSelectedBrand]
  )

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
            {affiliation && <StyledClipboardInput backgroundColor="#f4f8f8" text={affiliationUrl} />}
            <Button color="primaryGradient" onClick={affiliation ? onCustomLinkClick : onPromoteNowClick}>
              {affiliation ? 'Custom link' : 'Promote now'}
            </Button>
          </Actions>
        </MainContainer>
      </StyledSection>
      <BrandsModal brand={brand} createAffiliation={createAffiliation} open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  )
}

export default BrandCard
