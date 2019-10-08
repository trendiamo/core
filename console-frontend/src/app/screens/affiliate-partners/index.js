import List from './list'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  apiAffiliationCreate,
  apiAffiliationDestroy,
  apiAffiliationsList,
  apiBrandsList,
  apiInterestCreate,
  apiInterestDestroy,
  apiInterestsList,
  apiRequest,
} from 'utils'
import { useSnackbar } from 'notistack'

const AffiliatePartners = () => {
  const [animate, setAnimate] = useState(false)
  const [affiliations, setAffiliations] = useState([])
  const [brandsList, setBrandsList] = useState([])
  const [interests, setInterests] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
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
      setBrandsList(json)
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

  const fetchData = useCallback(
    async () => {
      setIsLoading(true)
      await Promise.all([fetchAffiliations(), fetchAvailableBrands(), fetchInterests()])
      setIsLoading(false)
    },
    [fetchAffiliations, fetchAvailableBrands, fetchInterests]
  )

  useEffect(
    () => {
      let didCancel = false
      ;(async () => {
        await fetchData()
        setTimeout(() => {
          didCancel || setAnimate(true)
        }, 0)
      })()
      return () => (didCancel = true)
    },
    [fetchData]
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
        await fetchData()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchData]
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
        await fetchData()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchData]
  )

  const selectedAffiliation = useMemo(
    () =>
      affiliations.find(affiliation => selectedBrand && affiliation.brand && affiliation.brand.id === selectedBrand.id),
    [affiliations, selectedBrand]
  )

  const removeAffiliation = useCallback(
    () => {
      return (async () => {
        if (!selectedAffiliation || !selectedBrand) return
        setIsLoading(true)
        const { json, errors, requestError } = await apiRequest(apiAffiliationDestroy, [selectedAffiliation.id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          mixpanel.track('Removed Affiliation', {
            hostname: window.location.hostname,
            brandId: selectedAffiliation.brand.id,
            brand: selectedAffiliation.brand.name,
          })
          enqueueSnackbar(`Successfully removed affiliation with ${selectedBrand.name}`, { variant: 'success' })
        }
        setIsLoading(false)
        await fetchData()
        return json
      })()
    },
    [enqueueSnackbar, fetchData, selectedAffiliation, selectedBrand]
  )

  const removeInterest = useCallback(
    interest => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiInterestDestroy, [interest.id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          mixpanel.track('Removed Interest', {
            hostname: window.location.hostname,
            brandId: interest.brand.id,
            brand: interest.brand.name,
          })
          enqueueSnackbar(`Removed notifications for ${interest.brand.name}`, { variant: 'success' })
        }
        await fetchData()
        return json
      })()
    },
    [enqueueSnackbar, fetchData]
  )

  return (
    <List
      affiliations={affiliations}
      animate={animate}
      brandsList={brandsList}
      createAffiliation={createAffiliation}
      createInterest={createInterest}
      interests={interests}
      isLoading={isLoading}
      removeAffiliation={removeAffiliation}
      removeInterest={removeInterest}
      selectedAffiliation={selectedAffiliation}
      selectedBrand={selectedBrand}
      setSelectedBrand={setSelectedBrand}
    />
  )
}

export default AffiliatePartners
