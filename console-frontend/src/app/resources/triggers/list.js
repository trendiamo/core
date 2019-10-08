import auth from 'auth'
import BlankStateTemplate from 'shared/blank-state'
import CircularProgress from 'shared/circular-progress'
import isEqual from 'lodash.isequal'
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import routes from 'app/routes'
import TriggersListBase from './list-base'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import welcomeImage from 'assets/img/background/img-welcome.png'
import { Actions } from 'shared/table-elements'
import { apiRequest, apiTriggerDestroy, apiTriggerList, apiTriggerSort } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { matchUrl } from 'plugin-base'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const BlankState = () => (
  <BlankStateTemplate
    buttonText="Create new"
    description={"You don't have any triggers yet. Let's create the first one?"}
    imageSource={welcomeImage}
    route={routes.triggerCreate()}
    title="Create a new trigger"
  />
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

const appBarContent = {
  Actions: <Actions buttonText="Create New" createRoute={routes.triggerCreate()} />,
  title: 'Triggers',
}

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
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'setSelectedIds') {
        return {
          ...state,
          isSelectAll: action.selectedIds.length === triggers.length,
          selectedIds: action.selectedIds,
        }
      } else if (action.type === 'handleSelectAll') {
        return {
          ...state,
          isSelectAll: !state.isSelectAll,
          selectedIds: action.checked ? triggers.map(resource => resource.id) : [],
        }
      }
    },
    {
      selectedIds: [],
      isSelectAll: false,
    }
  )

  const handleSelectAll = useCallback(event => dispatch({ type: 'handleSelectAll', checked: event.target.checked }), [])

  const setSelectedIds = useCallback(selectedIds => dispatch({ type: 'setSelectedIds', selectedIds }), [])

  const deleteTriggers = useCallback(
    async () => {
      const { requestError } = await apiRequest(apiTriggerDestroy, [{ ids: state.selectedIds }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      const { json, errors, requestError: requestError2 } = await apiRequest(apiTriggerList, [])
      if (requestError2) enqueueSnackbar(requestError2, { variant: 'error' })
      setIsLoading(false)
      setSelectedIds([])
      if (errors) return
      setTriggers(json)
    },
    [enqueueSnackbar, setSelectedIds, state.selectedIds]
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
        const { json, errors, requestError } = await apiRequest(apiTriggerList, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (requestError || errors) return
        setTriggers(json)
        setIsLoading(false)
      })()
    },
    [enqueueSnackbar]
  )

  const hostnames = useMemo(() => auth.getAccount().websitesAttributes[0].hostnames, [])

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
      isSelectAll={state.isSelectAll}
      onSortEnd={onSortEnd}
      selectedIds={state.selectedIds}
      setSelectedIds={setSelectedIds}
      setTesterUrl={setTesterUrl}
      testerUrl={testerUrl}
      triggers={triggers}
    />
  )
}

export default withRouter(TriggersList)
