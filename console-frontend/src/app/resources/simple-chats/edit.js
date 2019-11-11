import React, { useCallback } from 'react'
import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatShow, apiSimpleChatUpdate } from 'utils'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const EditSimpleChatForm = () => {
  const { simpleChatId } = useParams()

  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(() => {
    return (async () => {
      const { json, requestError } = await apiRequest(apiSimpleChatShow, [simpleChatId])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      return json
    })()
  }, [enqueueSnackbar, simpleChatId])

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiSimpleChatUpdate, [
          simpleChatId,
          { simpleChat: form },
        ])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully updated simple chat', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar, simpleChatId]
  )

  return (
    <SimpleChatForm
      backRoute={routes.simpleChatsList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Edit Simple Chat"
    />
  )
}

export default EditSimpleChatForm
