import BrandsModal from './brands-modal'
import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Chip, Typography } from '@material-ui/core'
import { IconButton } from 'shared/form-elements'

const StyledSection = styled(Section)`
  margin-top: 10px;
  transition: all 1s 0.2s;
  min-width: 900px;
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
  width: 150px;
  flex-shrink: 0;
`

const Image = styled.img`
  margin-right: 20px;
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  user-select: none;
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
  margin-left: 10px;
  min-width: 320px;
`

const TagsContainer = styled.div`
  min-width: 100px;
  display: flex;
  flex-wrap: wrap;
  margin: -4px;
  * + & {
    margin-top: 8px;
  }
`

const Tag = styled(Chip)`
  background-color: #8799a4;
  border-radius: 0;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  height: 21px;
  text-transform: uppercase;
  flex: 0;
  span {
    padding-left: 8px;
    padding-right: 8px;
  }
  margin: 4px;
`

const BrandCard = ({ affiliation, animate, brand, createAffiliation, setIsCustomLinkModalOpen, setSelectedBrand }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <div>
              {!affiliation && <Typography variant="body2">{brand.description}</Typography>}
              <TagsContainer>
                {brand.tags.split(',').map(tag => (
                  <Tag key={tag} label={tag} size="small" />
                ))}
              </TagsContainer>
            </div>
          </ImageAndDescriptionContainer>
          <Actions>
            <WebsiteButton websiteHostname={brand.websiteHostname} />
            {affiliation && <StyledClipboardInput backgroundColor="#e7ecef" size="large" text={affiliationUrl} />}
            <div />
            <Button
              color={affiliation ? 'white' : 'primaryGradient'}
              inline
              onClick={affiliation ? onCustomLinkClick : onPromoteNowClick}
              size="large"
            >
              {affiliation ? 'Custom link' : 'Promote now'}
            </Button>
          </Actions>
        </MainContainer>
      </StyledSection>
      <BrandsModal
        affiliation={affiliation}
        brand={brand}
        createAffiliation={createAffiliation}
        open={isModalOpen}
        setOpen={setIsModalOpen}
      />
    </>
  )
}

export default BrandCard
