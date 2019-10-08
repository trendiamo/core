import ActiveBrands from './active-brands'
import AvailableBrands from './available-brands'
import BrandModal from './brand-modal'
import BrandsComingSoon from './brands-coming-soon'
import CustomLinkModal from './custom-link-modal'
import React, { useEffect, useRef, useState } from 'react'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const sectionTitles = {
  activeBrands: 'Brands you work with',
  availableBrands: 'Brands you can work with',
  brandsComingSoon: 'Coming soon',
}

const appBarContent = ({ section }) => ({ title: sectionTitles[section] })

const List = ({
  affiliations,
  animate,
  interests,
  brandsList,
  createAffiliation,
  createInterest,
  isLoading,
  removeAffiliation,
  removeInterest,
  selectedAffiliation,
  setSelectedBrand,
  selectedBrand,
}) => {
  const [isCustomLinkModalOpen, setIsCustomLinkModalOpen] = useState(false)
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)
  const [titleKey, setTitleKey] = useState('activeBrands')
  const [sectionAppBarContent, setSectionAppBarContent] = useState(appBarContent({ section: titleKey }))

  useAppBarContent(sectionAppBarContent)

  useEffect(
    () => {
      setSectionAppBarContent(appBarContent({ section: titleKey }))
    },
    [titleKey]
  )

  const titleRefs = { availableBrands: useRef(null), brandsComingSoon: useRef(null) }

  // Here we use useRef + in lines below we use `if (isBottomSection === currentTitleKeyRef.current) return`
  // in order to optimize the performance of scroll event listener. If we don't do it the components will re-render
  // multiple times during scrolling of the page because of consistent state updates.
  const currentTitleKeyRef = useRef(false)

  useEffect(
    () => {
      document.addEventListener('scroll', () => {
        let currentTitleKey = 'activeBrands'
        Object.keys(titleRefs).forEach(key => {
          if (!titleRefs[key].current) return
          if (document.scrollingElement.scrollTop >= titleRefs[key].current.offsetTop + 30) {
            currentTitleKey = key
          }
        })
        if (currentTitleKey === currentTitleKeyRef.current) return
        currentTitleKeyRef.current = currentTitleKey
        setTitleKey(currentTitleKey)
      })
    },
    [titleRefs]
  )

  return (
    <>
      <ActiveBrands
        affiliations={affiliations}
        animate={animate}
        isLoading={isLoading}
        setIsBrandModalOpen={setIsBrandModalOpen}
        setIsCustomLinkModalOpen={setIsCustomLinkModalOpen}
        setSelectedBrand={setSelectedBrand}
      />
      <AvailableBrands
        animate={animate}
        brands={brandsList}
        isLoading={isLoading}
        setIsBrandModalOpen={setIsBrandModalOpen}
        setSelectedBrand={setSelectedBrand}
        title={sectionTitles.availableBrands}
        titleRef={titleRefs.availableBrands}
      />
      <BrandsComingSoon
        animate={animate}
        brands={brandsList}
        interests={interests}
        isLoading={isLoading}
        removeInterest={removeInterest}
        setIsBrandModalOpen={setIsBrandModalOpen}
        setSelectedBrand={setSelectedBrand}
        title={sectionTitles.brandsComingSoon}
        titleRef={titleRefs.brandsComingSoon}
      />
      <CustomLinkModal
        affiliation={selectedAffiliation}
        open={isCustomLinkModalOpen}
        setOpen={setIsCustomLinkModalOpen}
      />
      <BrandModal
        affiliation={selectedAffiliation}
        brand={selectedBrand}
        createAffiliation={createAffiliation}
        createInterest={createInterest}
        interests={interests}
        isLoading={isLoading}
        open={isBrandModalOpen}
        removeAffiliation={removeAffiliation}
        removeInterest={removeInterest}
        selectedAffiliation={selectedAffiliation}
        setOpen={setIsBrandModalOpen}
      />
    </>
  )
}

export default List
