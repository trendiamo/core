import React, { useCallback } from 'react'
import routes from 'app/routes'
import SimpleChatForm from './form'
import { apiRequest, apiSimpleChatCreate } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    name: '',
    title: '',
    personaId: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
    simpleChatStepsAttributes: [
      {
        key: 'default',
        simpleChatMessagesAttributes: [{ text: '', __type: 'text', __key: 'new-0' }],
      },
    ],
  }
}

const CreateSimpleChatForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiSimpleChatCreate, [{ simpleChat: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created simple chat', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <SimpleChatForm
      backRoute={routes.simpleChatsList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Simple Chat"
    />
  )
}

export default CreateSimpleChatForm
