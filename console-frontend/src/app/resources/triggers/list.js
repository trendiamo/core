import AppBarButton from 'shared/app-bar-button'
import BlankStateTemplate from 'shared/blank-state'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import TriggersListBase from './list-base'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiRequest, apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { isEqual } from 'lodash'
import { Link } from 'react-router-dom'
import { matchUrl } from 'plugin-base'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any triggers yet. Let's create the first one?"}
    imageSource="/img/background/img-welcome.png"
    route={routes.triggerCreate()}
    title="Create a new trigger"
  />
)

const Actions = () => (
  <AppBarButton color="primary" component={Link} to={routes.triggerCreate()} variant="contained">
    {'Create New'}
  </AppBarButton>
)

const iterateTriggers = (triggers, input, result) => {
  triggers.forEach((trigger, index) => {
    if (result) return false
    trigger.urlMatchers.map((url, urlIndex) => {
      const matches = matchUrl(input, url)
      if (matches) result = { index, urlIndex }
      return result
    })
  })
  return result
}

const isValidUrl = referenceUrl => {
  const regexp = /https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/
  return regexp.test(referenceUrl)
}

const matchTriggers = (triggers, referenceUrl, hostnames) => {
  let result = false
  let input = referenceUrl
  if (referenceUrl.charAt(0) === '/') {
    result = iterateTriggers(triggers, input, result)
    return result
  } else {
    const parsedReferenceUrl = isValidUrl(referenceUrl) ? new URL(`${referenceUrl}`) : false
    input = parsedReferenceUrl.pathname
    hostnames.forEach(hostname => {
      if (parsedReferenceUrl.hostname === hostname) {
        result = iterateTriggers(triggers, input, result)
        return result
      }
    })
  }
  return result
}

const appBarContent = { Actions: <Actions />, title: 'Triggers' }

const TriggersList = ({ location }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'triggers', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  useAppBarContent(appBarContent)
  const { enqueueSnackbar } = useSnackbar()

  const [triggers, setTriggers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [testerUrl, setTesterUrl] = useState({ value: '', matches: false })
  const [selectedIds, setSelectedIds] = useState([])
  const [hostnames, setHostnames] = useState([])
  const [isSelectAll, setIsSelectAll] = useState(false)

  const deleteTriggers = useCallback(
    async () => {
      const { requestError } = await apiRequest(apiTriggerDestroy, [{ ids: selectedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      const { json, errors, requestError: requestError2 } = await apiRequest(apiTriggerList, [])
      if (requestError2) enqueueSnackbar(requestError2, { variant: 'error' })
      setIsLoading(false)
      setSelectedIds([])
      setIsSelectAll(false)
      if (errors) return
      setTriggers(json)
    },
    [enqueueSnackbar, selectedIds]
  )

  const handleSelectAll = useCallback(
    event => {
      setSelectedIds(event.target.checked ? triggers.map(trigger => trigger.id) : [])
      setIsSelectAll(event.target.checked)
    },
    [triggers]
  )

  const onSortEnd = useCallback(
    async ({ oldIndex, newIndex }) => {
      const orderedTriggers = arrayMove(triggers, oldIndex, newIndex)
      const orderedIds = orderedTriggers.map(trigger => trigger.id)
      setTriggers(orderedTriggers)
      const { errors, requestError } = await apiRequest(apiTriggerSort, [{ ids: orderedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Sorted!', { variant: 'success' })
    },
    [enqueueSnackbar, triggers]
  )

  useEffect(
    () => {
      ;(async () => {
        const { json, response, errors, requestError } = await apiRequest(apiTriggerList, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (requestError || errors) return
        setTriggers(json)
        setHostnames(JSON.parse(response.headers.get('hostnames')))
        setIsLoading(false)
      })()
    },
    [enqueueSnackbar]
  )

  useEffect(
    () => {
      if (testerUrl.value) {
        const matchesUrl = matchTriggers(triggers, testerUrl.value, hostnames)
        if (!isEqual(testerUrl.matches, matchesUrl)) {
          setTesterUrl({ ...testerUrl, matches: matchesUrl })
        }
      }
    },
    [hostnames, testerUrl, triggers]
  )

  if (isLoading) return <CircularProgress />
  if (triggers.length === 0) return <BlankState />

  return (
    <TriggersListBase
      deleteTriggers={deleteTriggers}
      handleSelectAll={handleSelectAll}
      hostnames={hostnames}
      isSelectAll={isSelectAll}
      onSortEnd={onSortEnd}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
      setTesterUrl={setTesterUrl}
      testerUrl={testerUrl}
      triggers={triggers}
    />
  )
}

export default withRouter(TriggersList)
