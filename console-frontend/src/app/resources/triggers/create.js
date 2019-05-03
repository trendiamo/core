import BaseTriggerForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiRequest, apiTriggerCreate } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    flowId: '',
    flowType: '',
    urlMatchers: [''],
  }
}

const TriggerForm = props => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiTriggerCreate, [{ trigger: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created trigger', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <BaseTriggerForm
      {...props}
      backRoute={routes.triggersList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Trigger"
    />
  )
}

export default TriggerForm
