import BaseTriggerForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiRequest, apiTriggerShow, apiTriggerUpdate } from 'utils'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const TriggerForm = ({ ...props }) => {
  let { triggerId } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(() => {
    return (async () => {
      const { json, requestError } = await apiRequest(apiTriggerShow, [triggerId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    })()
  }, [enqueueSnackbar, triggerId])

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiTriggerUpdate, [triggerId, { trigger: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated trigger', { variant: 'success' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, triggerId]
  )

  return (
    <BaseTriggerForm
      {...props}
      backRoute={routes.triggersList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Edit Trigger"
    />
  )
}

export default TriggerForm
