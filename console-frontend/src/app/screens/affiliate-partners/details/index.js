import CircularProgress from 'shared/circular-progress'
import CustomLinkModal from './custom-link-modal'
import MainCard from './main-card'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import RequestSampleModal from './request-sample-modal'
import routes from 'app/routes'
import SideCards from './side-cards'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiAffiliationsList, apiBrandShow, apiInterestsList, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const FlexGrid = styled(Grid)`
  justify-content: center;
`

const SideContainer = styled.div`
  margin-top: 12px;
  width: 100%;

  @media (min-width: 960px) {
    margin-top: 0;
  }
`

const BrandPage = () => {
  const { brandId } = useParams()

  const [brand, setBrand] = useState(null)
  const [affiliations, setAffiliations] = useState([])
  const [interests, setInterests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRequestSampleModalOpen, setIsRequestSampleModalOpen] = useState(false)
  const [isCustomLinkModalOpen, setIsCustomLinkModalOpen] = useState(false)
  const [termsAndConditionsExpanded, setTermsAndConditionsExpanded] = useState(false)

  const appBarContent = useMemo(
    () => ({ backRoute: routes.affiliatePartners(), title: 'Back', backRouteTitle: true }),
    []
  )

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'affiliatePartners', stageName: 'uptous', pathname: window.location.pathname }),
    []
  )
  useOnboardingHelp(onboardingHelp)

  useAppBarContent(appBarContent)

  const { enqueueSnackbar } = useSnackbar()

  const fetchBrand = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiBrandShow, [brandId])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setBrand(json)
  }, [brandId, enqueueSnackbar])

  const fetchAffiliations = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiAffiliationsList, [])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setAffiliations(json)
  }, [enqueueSnackbar])
  const affiliation = useMemo(
    () => affiliations && affiliations.find(affiliation => brand && affiliation.brand.id === brand.id),
    [affiliations, brand]
  )

  const fetchInterests = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiInterestsList, [])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setInterests(json)
  }, [enqueueSnackbar])
  const interest = useMemo(() => interests && interests.find(interest => brand && interest.brand.id === brand.id), [
    brand,
    interests,
  ])

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await Promise.all([fetchAffiliations(), fetchInterests()])
      await fetchBrand()
      setIsLoading(false)
    })()
  }, [fetchBrand, fetchAffiliations, fetchInterests])

  const onTermsAndConditionsChange = useCallback((_el, value) => setTermsAndConditionsExpanded(value), [])

  const termsRef = useRef(null)
  const headerRef = useRef(null)
  const timeoutRef = useRef(null)

  const scrollToTermsAndConditions = useCallback(() => {
    if (!termsRef.current || !headerRef.current) return
    onTermsAndConditionsChange(null, true)
    timeoutRef.current = setTimeout(() => {
      document.scrollingElement.scrollTo({
        top: termsRef.current.offsetTop + headerRef.current.clientHeight + 150,
        behaviour: 'smooth',
      })
    }, 300)
  }, [onTermsAndConditionsChange])

  if (isLoading) return <CircularProgress />

  return (
    <FlexGrid container>
      <Grid item lg={7} md={8} xl={6} xs={12}>
        <MainCard
          brand={brand}
          headerRef={headerRef}
          onTermsAndConditionsChange={onTermsAndConditionsChange}
          termsAndConditionsExpanded={termsAndConditionsExpanded}
          termsRef={termsRef}
        />
      </Grid>
      <Grid item lg={3} md={3} xl={2} xs={12}>
        <SideContainer>
          <SideCards
            affiliation={affiliation}
            brand={brand}
            fetchAffiliations={fetchAffiliations}
            fetchInterests={fetchInterests}
            interest={interest}
            scrollToTermsAndConditions={scrollToTermsAndConditions}
            setIsCustomLinkModalOpen={setIsCustomLinkModalOpen}
            setIsRequestSampleModalOpen={setIsRequestSampleModalOpen}
          />
        </SideContainer>
      </Grid>
      <RequestSampleModal brand={brand} open={isRequestSampleModalOpen} setOpen={setIsRequestSampleModalOpen} />
      <CustomLinkModal affiliation={affiliation} open={isCustomLinkModalOpen} setOpen={setIsCustomLinkModalOpen} />
    </FlexGrid>
  )
}

export default BrandPage
