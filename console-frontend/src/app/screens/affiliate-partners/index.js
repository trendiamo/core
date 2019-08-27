import omit from 'lodash.omit'
import React, { useEffect, useRef, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import Title from 'shared/main-title'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiBrandsList, apiRequest } from 'utils'
import { Button, IconButton } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const sectionTitles = {
  promotingBrands: 'Brands you work with',
  availableBrands: 'Brands you can work with',
}

const appBarContent = ({ section }) => ({ title: sectionTitles[section] })

const chosenBrands = []

const EmptyBrandsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  user-select: none;
`

const RocketIcon = styled.img`
  margin-bottom: 20px;
  transition: all 1.6s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(30px);
  `}
`

const EmptyBrandsDescription = styled.div`
  color: #8799a4;
  text-align: center;
  transition: all 1.6s 0.2s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(30px);
  `}
`

const EmptyBrands = ({ animate }) => {
  return (
    <EmptyBrandsContainer>
      <RocketIcon animate={animate} src="/img/icons/rocket.svg" />
      <EmptyBrandsDescription animate={animate}>
        <div>{'You are not working with any brands yet.'}</div>
        <div>{'Pick partners from the list to start promoting and earning today!'}</div>
      </EmptyBrandsDescription>
    </EmptyBrandsContainer>
  )
}

const ChosenBrands = () => {
  const [animate, setAnimate] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      let didCancel = false
      setTimeout(() => {
        didCancel || setAnimate(true)
      }, 100)

      return () => (didCancel = true)
    },
    [enqueueSnackbar]
  )

  if (chosenBrands.length === 0) return <EmptyBrands animate={animate} />

  return <div>{'Chosen Brands'}</div>
}

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 140px;
`

const BrandImage = styled.img`
  margin-right: 20px;
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
`

const BrandDescription = styled.div`
  color: #1b3b50;
  max-width: 600px;
`

const PromoteNowButton = styled(Button)`
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 30px;
  padding: 6px 18px;
  font-size: 18px;
  color: #fff;
  margin-left: 10px;
  overflow: hidden;
  opacity: 1;
  background: linear-gradient(to right, #12e5c4, #18e0aa);
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0;
    transition: opacity 0.3s;
  }
  &:hover {
    &:after {
      opacity: 0.2;
    }
  }
  span {
    z-index: 1;
  }
`

const BrandLink = ({ websiteUrl }) => {
  return (
    <a href={websiteUrl} rel="noopener noreferrer" target="_blank">
      <IconButton>
        <img alt="" src="/img/icons/new_tab.svg" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
      </IconButton>
    </a>
  )
}

const BrandImageAndDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BrandActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`

const BrandImageContainer = styled.div`
  width: 220px;
  margin-right: 20px;
  text-align: center;
`

const BrandItem = ({ brand }) => {
  return (
    <BrandContainer key={brand.id}>
      <BrandImageAndDescription>
        <BrandImageContainer>
          <BrandImage src={brand.logoUrl} />
        </BrandImageContainer>
        <BrandDescription>{brand.description}</BrandDescription>
      </BrandImageAndDescription>
      <BrandActions>
        <BrandLink websiteUrl={brand.websiteUrl} />
        <PromoteNowButton>{'Promote Now'}</PromoteNowButton>
      </BrandActions>
    </BrandContainer>
  )
}

const StyledTitle = styled(props => <Title {...omit(props, ['animate'])} />)`
  margin-bottom: 20px;
  transition: all 1s 0.6s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const StyledSection = styled(Section)`
  transition: all 1s 0.8s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const BrandSection = ({ availableBrand, animate }) => {
  return (
    <StyledSection animate={animate}>
      <BrandItem brand={availableBrand} />
    </StyledSection>
  )
}

const BrandSuggestions = ({ secondTitleRef }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [availableBrands, setAvailableBrands] = useState([])
  const [animate, setAnimate] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      let didCancel = false
      ;(async () => {
        const { json, errors, requestError } = await apiRequest(apiBrandsList, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (requestError || errors) return
        setAvailableBrands(json)
        setIsLoading(false)
        setTimeout(() => {
          didCancel || setAnimate(true)
        }, 100)
      })()
      return () => (didCancel = true)
    },
    [enqueueSnackbar]
  )

  if (isLoading) return <div />

  return (
    <div>
      <div ref={secondTitleRef}>
        <StyledTitle animate={animate}>{sectionTitles.availableBrands}</StyledTitle>
      </div>
      {availableBrands.map(availableBrand => (
        <BrandSection animate={animate} availableBrand={availableBrand} key={availableBrand.id} />
      ))}
    </div>
  )
}

const AffiliatePartners = () => {
  const [isAvailableBrandsSection, setIsAvailableBrandsSection] = useState(false)
  const [sectionAppBarContent, setSectionAppBarContent] = useState(appBarContent({ section: 'promotingBrands' }))

  const secondTitleRef = useRef(null)

  // Here we use useRef + in lines below we use `if (isBottomSection === sectionValueRef.current) return`
  // in order to optimize the performance of scroll event listener. If we don't do it the components will re-render
  // multiple times during scrolling of the page because of consistent state updates.
  const sectionValueRef = useRef(false)

  useAppBarContent(sectionAppBarContent)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (!secondTitleRef.current) return
      const isBottomSection = document.scrollingElement.scrollTop >= secondTitleRef.current.offsetTop + 30
      if (isBottomSection === sectionValueRef.current) return
      sectionValueRef.current = isBottomSection
      setIsAvailableBrandsSection(isBottomSection)
    })
  }, [])

  useEffect(
    () => {
      setSectionAppBarContent(
        appBarContent({ section: isAvailableBrandsSection ? 'availableBrands' : 'promotingBrands' })
      )
    },
    [isAvailableBrandsSection]
  )

  return (
    <div>
      <ChosenBrands />
      <BrandSuggestions secondTitleRef={secondTitleRef} />
    </div>
  )
}

export default AffiliatePartners
