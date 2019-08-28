import BrandSuggestions from './brand-suggestions'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
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
      <BrandSuggestions secondTitleRef={secondTitleRef} sectionTitles={sectionTitles} />
    </div>
  )
}

export default AffiliatePartners
