import NavigationForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiNavigationShow, apiNavigationUpdate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const EditNavigationForm = ({ match }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.navigationId
        const { json, requestError } = await apiRequest(apiNavigationShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.navigationId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.navigationId
        const { json, errors, requestError } = await apiRequest(apiNavigationUpdate, [id, { navigation: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated navigation', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.navigationId]
  )

  return (
    <NavigationForm
      backRoute={routes.navigationsList()}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Navigation"
    />
  )
}

export default EditNavigationForm
