import PersonaForm from './form'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import { apiPersonaCreate, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const loadFormObject = () => {
  return {
    name: '',
    description: '',
    profilePicUrl: '',
    instagramUrl: '',
    picRect: '',
  }
}

const CreatePersonaForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiPersonaCreate, [{ persona: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) enqueueSnackbar('Successfully created persona', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <PersonaForm
      backRoute={routes.personasList()}
      loadFormObject={loadFormObject}
      onboardingCreate
      saveFormObject={saveFormObject}
      title="Create Persona"
    />
  )
}

export default CreatePersonaForm
