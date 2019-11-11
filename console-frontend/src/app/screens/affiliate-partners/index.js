import List from './list'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiAffiliationsList, apiBrandsList, apiInterestsList, apiRequest } from 'utils'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'

const AffiliatePartners = () => {
  const [animate, setAnimate] = useState(false)
  const [affiliations, setAffiliations] = useState([])
  const [brandsList, setBrandsList] = useState([])
  const [interests, setInterests] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'affiliatePartners', stageName: 'uptous', pathname: window.location.pathname }),
    []
  )
  useOnboardingHelp(onboardingHelp)

  const fetchAffiliations = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiAffiliationsList, [])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setAffiliations(json)
  }, [enqueueSnackbar])

  const fetchAvailableBrands = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiBrandsList, [])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setBrandsList(json)
  }, [enqueueSnackbar])

  const fetchInterests = useCallback(async () => {
    const { json, errors, requestError } = await apiRequest(apiInterestsList, [])
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) return
    setInterests(json)
  }, [enqueueSnackbar])

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    await Promise.all([fetchAffiliations(), fetchAvailableBrands(), fetchInterests()])
    setIsLoading(false)
  }, [fetchAffiliations, fetchAvailableBrands, fetchInterests])

  useEffect(() => {
    let didCancel = false
    ;(async () => {
      await fetchData()
      setTimeout(() => {
        didCancel || setAnimate(true)
      }, 0)
    })()
    return () => (didCancel = true)
  }, [fetchData])

  return (
    <List
      affiliations={affiliations}
      animate={animate}
      brandsList={brandsList}
      interests={interests}
      isLoading={isLoading}
    />
  )
}

export default AffiliatePartners
