import BasePersonaForm from './form'
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
  }
}

const PersonaForm = props => {
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
    <BasePersonaForm
      {...props}
      backRoute={routes.personasList()}
      enqueueSnackbar={enqueueSnackbar}
      loadFormObject={loadFormObject}
      onboardingCreate
      saveFormObject={saveFormObject}
      title="Create Persona"
    />
  )
}

export default PersonaForm
