import BaseSimpleChatForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiRequest, apiSimpleChatShow, apiSimpleChatUpdate } from 'utils'
import { useSnackbar } from 'notistack'

const SimpleChatForm = ({ match, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.simpleChatId
        const { json, requestError } = await apiRequest(apiSimpleChatShow, [id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.simpleChatId]
  )

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const id = match.params.simpleChatId
        const { json, errors, requestError } = await apiRequest(apiSimpleChatUpdate, [id, { simpleChat: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated simple chat', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, match.params.simpleChatId]
  )

  return (
    <BaseSimpleChatForm
      {...props}
      backRoute={routes.simpleChatsList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      showChildSteps
      title="Edit Simple Chat"
    />
  )
}

export default SimpleChatForm
