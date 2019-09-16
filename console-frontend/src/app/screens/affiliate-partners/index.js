import ActiveBrands from './active-brands'
import auth from 'auth'
import AvailableBrands from './available-brands'
import CustomLinkModal from './custom-link-modal'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiAffiliationCreate, apiAffiliationsList, apiBrandsList, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const sectionTitles = {
  activeBrands: 'Brands you work with',
  availableBrands: 'Brands you can work with',
}

const appBarContent = ({ section }) => ({ title: sectionTitles[section] })

const AffiliatePartners = () => {
  const [animate, setAnimate] = useState(false)
  const [affiliations, setAffiliations] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [isAvailableBrandsSection, setIsAvailableBrandsSection] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sectionAppBarContent, setSectionAppBarContent] = useState(appBarContent({ section: 'activeBrands' }))
  const [isCustomLinkModalOpen, setIsCustomLinkModalOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)

  const { enqueueSnackbar } = useSnackbar()

  const fetchAffiliations = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiAffiliationsList, [])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      setAffiliations(json)
    },
    [enqueueSnackbar]
  )

  const fetchAvailableBrands = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiBrandsList, [])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      setAvailableBrands(json)
    },
    [enqueueSnackbar]
  )

  const fetchAffiliationsAndBrands = useCallback(
    () => {
      let didCancel = false
      ;(async () => {
        setIsLoading(true)
        await Promise.all([fetchAffiliations(), fetchAvailableBrands()])
        setIsLoading(false)
        setTimeout(() => {
          didCancel || setAnimate(true)
        }, 100)
      })()
      return () => (didCancel = true)
    },
    [fetchAffiliations, fetchAvailableBrands]
  )

  useEffect(() => fetchAffiliationsAndBrands(), [fetchAffiliationsAndBrands])

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
          { brandId: brand.id, userId: auth.getUser().id },
        ])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`Successfully created affiliation with ${brand.name}`, { variant: 'success' })
        }
        fetchAffiliationsAndBrands()
        return json
      })()
    },
    [enqueueSnackbar, fetchAffiliationsAndBrands]
  )

  const selectedAffiliation = useMemo(() => affiliations.find(affiliation => affiliation.brand === selectedBrand), [
    affiliations,
    selectedBrand,
  ])

  return (
    <>
      <ActiveBrands
        affiliations={affiliations}
        animate={animate}
        isLoading={isLoading}
        setIsCustomLinkModalOpen={setIsCustomLinkModalOpen}
        setSelectedBrand={setSelectedBrand}
      />
      <AvailableBrands
        animate={animate}
        brands={availableBrands}
        createAffiliation={createAffiliation}
        isLoading={isLoading}
        title={sectionTitles.availableBrands}
        titleRef={secondTitleRef}
      />
      <CustomLinkModal
        affiliation={selectedAffiliation}
        open={isCustomLinkModalOpen}
        setOpen={setIsCustomLinkModalOpen}
      />
    </>
  )
}

export default AffiliatePartners
