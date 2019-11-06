import CircularProgress from 'shared/circular-progress'
import CustomLinkModal from 'app/screens/affiliate-partners/custom-link-modal'
import Description from './description'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import SideBlock from './side-block'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import {
  apiAffiliationCreate,
  apiAffiliationsList,
  apiBrandShow,
  apiInterestCreate,
  apiInterestDestroy,
  apiInterestsList,
  apiRequest,
} from 'utils'
import { Grid } from '@material-ui/core'
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

const BrandPage = ({ match }) => {
  const [brand, setBrand] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [affiliations, setAffiliations] = useState([])
  const [interests, setInterests] = useState([])
  const [isCreateLinkClicked, setIsCreateLinkClicked] = useState(false)
  const [isNotificationButtonClicked, setIsNotificationButtonClicked] = useState(false)
  const [isCustomLinkModalOpen, setIsCustomLinkModalOpen] = useState(false)

  const appBarContent = useMemo(() => ({ backRoute: routes.affiliatePartners(), title: brand ? brand.name : '' }), [
    brand,
  ])

  useAppBarContent(appBarContent)

  const brandId = useMemo(
    () => {
      return match.params.brandId
    },
    [match.params.brandId]
  )

  const { enqueueSnackbar } = useSnackbar()

  const fetchBrand = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiBrandShow, [brandId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      setBrand(json)
    },
    [brandId, enqueueSnackbar]
  )

  const fetchAffiliations = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiAffiliationsList, [])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      setAffiliations(json)
    },
    [enqueueSnackbar]
  )

  const fetchInterests = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiInterestsList, [])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) return
      setInterests(json)
    },
    [enqueueSnackbar]
  )

  const fetchAffiliationsAndInterests = useCallback(
    async () => {
      await Promise.all([fetchAffiliations(), fetchInterests()])
    },
    [fetchAffiliations, fetchInterests]
  )

  const interest = useMemo(() => interests && interests.find(interest => brand && interest.brand.id === brand.id), [
    brand,
    interests,
  ])
  const affiliation = useMemo(
    () => affiliations && affiliations.find(affiliation => brand && affiliation.brand.id === brand.id),
    [affiliations, brand]
  )

  useEffect(
    () => {
      ;(async () => {
        setIsLoading(true)
        // We're doing the requests separately because in other cases we don't need to refresh the brand data every time, as we don't change it's model.
        await fetchAffiliationsAndInterests()
        await fetchBrand()
        setIsLoading(false)
      })()
    },
    [fetchBrand, fetchAffiliationsAndInterests]
  )

  const createAffiliation = useCallback(
    brand => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiAffiliationCreate, [{ brandId: brand.id }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`Successfully created affiliation with ${brand.name}`, { variant: 'success' })
        }
        await fetchAffiliationsAndInterests()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchAffiliationsAndInterests]
  )

  const createInterest = useCallback(
    brand => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiInterestCreate, [{ brandId: brand.id }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`You'll get notified for updates on ${brand.name}`, { variant: 'success' })
        }
        await fetchAffiliationsAndInterests()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchAffiliationsAndInterests]
  )

  const removeInterest = useCallback(
    async () => {
      if (!brand || !interest) return
      const { json, errors, requestError } = await apiRequest(apiInterestDestroy, [interest.id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        mixpanel.track('Removed Interest', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
        enqueueSnackbar(`Removed notifications for ${brand.name}`, { variant: 'success' })
      }
      await fetchAffiliationsAndInterests()
      return json
    },
    [brand, enqueueSnackbar, fetchAffiliationsAndInterests, interest]
  )

  const onCreateLinkClick = useCallback(
    async () => {
      setIsCreateLinkClicked(true)
      const { errors, requestError } = await createAffiliation(brand)
      if (!errors && !requestError) {
        setIsCreateLinkClicked(false)
        mixpanel.track('Created Affiliate Link', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
      }
    },
    [brand, createAffiliation]
  )

  const onNotifyMeClick = useCallback(
    async () => {
      setIsNotificationButtonClicked(true)
      const { errors, requestError } = await createInterest(brand)
      if (!errors && !requestError) {
        mixpanel.track('Clicked Notify Me', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
      }
      setIsNotificationButtonClicked(false)
    },
    [brand, createInterest]
  )

  const onRemoveNotificationClick = useCallback(
    async () => {
      if (!brand) return
      setIsNotificationButtonClicked(true)
      mixpanel.track('Clicked Remove Notification', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
      await removeInterest()
      setIsNotificationButtonClicked()
    },
    [brand, removeInterest]
  )

  const onCustomLinkClick = useCallback(() => {
    setIsCustomLinkModalOpen(true)
  }, [])

  if (isLoading) return <CircularProgress />

  return (
    <FlexGrid container>
      <Grid item lg={7} md={8} xl={6} xs={12}>
        <Description brand={brand} />
      </Grid>
      <Grid item lg={3} md={3} xl={2} xs={12}>
        <SideContainer>
          <SideBlock
            affiliation={affiliation}
            brand={brand}
            interest={interest}
            isCreateLinkClicked={isCreateLinkClicked}
            isNotificationButtonClicked={isNotificationButtonClicked}
            onCreateLinkClick={onCreateLinkClick}
            onCustomLinkClick={onCustomLinkClick}
            onNotifyMeClick={onNotifyMeClick}
            onRemoveNotificationClick={onRemoveNotificationClick}
          />
        </SideContainer>
      </Grid>
      <CustomLinkModal affiliation={affiliation} open={isCustomLinkModalOpen} setOpen={setIsCustomLinkModalOpen} />
    </FlexGrid>
  )
}

export default BrandPage
