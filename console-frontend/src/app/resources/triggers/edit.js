import BaseTriggerForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiRequest, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const TriggerForm = ({ match, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.triggerId
        const { json, requestError } = await apiRequest(apiTriggerShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.triggerId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.triggerId
        const { json, errors, requestError } = await apiRequest(apiTriggerUpdate, [id, { trigger: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated trigger', { variant: 'success' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.triggerId]
  )

  return (
    <BaseTriggerForm
      {...props}
      backRoute={routes.triggersList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      match={match}
      saveFormObject={saveFormObject}
      title="Edit Trigger"
    />
  )
}

export default withRouter(TriggerForm)
