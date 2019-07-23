import React, { useCallback } from 'react'
import routes from 'app/routes'
import ShowcaseForm from './form'
import { apiRequest, apiShowcaseCreate } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    name: '',
    personaId: '',
    usePersonaAnimation: false,
    title: '',
    subtitle: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
    spotlightsAttributes: [
      {
        personaId: '',
        usePersonaAnimation: false,
        productPicksAttributes: [
          {
            url: '',
            name: '',
            description: '',
            displayPrice: '',
            picture: { url: '' },
            picRect: {},
            __key: 'new-0',
          },
        ],
        __key: 'new-0',
      },
    ],
  }
}

const CreateShowcaseForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiShowcaseCreate, [{ showcase: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created showcase', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <ShowcaseForm
      backRoute={routes.showcasesList()}
      loadFormObject={loadFormObject}
      saveFormObject={saveFormObject}
      title="Create Showcase"
    />
  )
}

export default CreateShowcaseForm
