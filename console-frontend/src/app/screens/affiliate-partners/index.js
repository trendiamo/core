import ActiveBrands from './active-brands'
import auth from 'auth'
import AvailableBrands from './available-brands'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiAffiliationCreate, apiBrandsList, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const sectionTitles = {
  activeBrands: 'Brands you work with',
  availableBrands: 'Brands you can work with',
}

const appBarContent = ({ section }) => ({ title: sectionTitles[section] })

const AffiliatePartners = () => {
  const [animate, setAnimate] = useState(false)
  const [activeBrands, setActiveBrands] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [isAvailableBrandsSection, setIsAvailableBrandsSection] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sectionAppBarContent, setSectionAppBarContent] = useState(appBarContent({ section: 'activeBrands' }))

  const { enqueueSnackbar } = useSnackbar()

  const fetchBrands = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiBrandsList, [])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      const activeBrands = json.filter(brand => brand.affiliations.length > 0)
      const availableBrands = json.filter(brand => !activeBrands.includes(brand))
      setActiveBrands(activeBrands)
      setAvailableBrands(availableBrands)
      setIsLoading(false)
    },
    [enqueueSnackbar]
  )

  useEffect(
    () => {
      let didCancel = false
      ;(async () => {
        await fetchBrands()
        setTimeout(() => {
          didCancel || setAnimate(true)
        }, 100)
      })()
      return () => (didCancel = true)
    },
    [fetchBrands]
  )

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
      setSectionAppBarContent(appBarContent({ section: isAvailableBrandsSection ? 'availableBrands' : 'activeBrands' }))
    },
    [isAvailableBrandsSection]
  )

  const createAffiliation = useCallback(
    brand => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiAffiliationCreate, [
          { accountId: brand.accountId, userId: auth.getUser().id },
        ])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`Successfully created affiliation with ${brand.name}`, { variant: 'success' })
        }
        fetchBrands()
        return json
      })()
    },
    [enqueueSnackbar, fetchBrands]
  )

  return (
    <>
      <ActiveBrands animate={animate} brands={activeBrands} isLoading={isLoading} />
      <AvailableBrands
        animate={animate}
        brands={availableBrands}
        createAffiliation={createAffiliation}
        isLoading={isLoading}
        title={sectionTitles.availableBrands}
        titleRef={secondTitleRef}
      />
    </>
  )
}

export default AffiliatePartners
