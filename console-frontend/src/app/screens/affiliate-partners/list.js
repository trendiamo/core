import ActiveBrands from './active-brands'
import AvailableBrands from './available-brands'
import BrandsComingSoon from './brands-coming-soon'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Title from 'shared/main-title'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { withRouter } from 'react-router'

const sectionTitles = {
  activeBrands: 'Brands you work with',
  availableBrands: 'Brands you can work with',
  brandsComingSoon: 'Coming soon',
}

const StyledTitle = styled(props => <Title {...omit(props, ['animate', 'ref'])} />)`
  margin: 20px 0;
  transition: all 1s 0.1s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const appBarContent = ({ section }) => ({ title: sectionTitles[section] })

const List = ({ affiliations, animate, interests, brandsList, isLoading, history }) => {
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
  const didCancel = useRef(false)

  useEffect(
    () => {
      if (window.affiliatePartnersScrollListener) {
        document.removeEventListener('scroll', window.affiliatePartnersScrollListener)
      }
      window.affiliatePartnersScrollListener = () => {
        if (didCancel.current) return
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
      }
      document.addEventListener('scroll', window.affiliatePartnersScrollListener)
    },
    [titleRefs]
  )

  useEffect(() => {
    return () => {
      didCancel.current = true
    }
  }, [])

  const goToBrandPage = useCallback(
    brand => {
      history.push(routes.affiliatePartner(brand.id))
    },
    [history]
  )

  const brandsToShow = useMemo(() => brandsList.filter(brand => !brand.isPreview), [brandsList])

  return (
    <>
      <ActiveBrands affiliations={affiliations} animate={animate} goToBrandPage={goToBrandPage} isLoading={isLoading} />
      {brandsToShow.length > 0 && (
        <div ref={titleRefs.availableBrands}>
          <StyledTitle animate={animate}>{sectionTitles.availableBrands}</StyledTitle>
        </div>
      )}
      <AvailableBrands
        animate={animate}
        brands={brandsList}
        brandsToShow={brandsToShow}
        goToBrandPage={goToBrandPage}
        isLoading={isLoading}
      />
      <div ref={titleRefs.brandsComingSoon}>
        <StyledTitle animate={animate}>{sectionTitles.brandsComingSoon}</StyledTitle>
      </div>
      <BrandsComingSoon
        animate={animate}
        brands={brandsList}
        goToBrandPage={goToBrandPage}
        interests={interests}
        isLoading={isLoading}
      />
    </>
  )
}

export default withRouter(List)
