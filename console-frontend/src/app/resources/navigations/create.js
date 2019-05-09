import NavigationForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiNavigationCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    personaId: '',
    name: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
    navigationItemsAttributes: [
      {
        text: '',
        url: '',
        picUrl: '',
      },
    ],
  }
}

const CreateNavigationForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiNavigationCreate, [{ navigation: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <NavigationForm
      backRoute={routes.navigationsList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Navigation"
    />
  )
}

export default CreateNavigationForm
